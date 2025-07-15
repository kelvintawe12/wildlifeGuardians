import { supabase } from './supabaseClient';

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'moderator' | 'content_manager';
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  admin_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
  admin_user?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_type: 'star' | 'trophy' | 'medal' | 'crown' | 'shield';
  color: string;
  criteria?: string;
  is_active: boolean;
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  earned_count?: number;
}

export interface ContentItem {
  id: string;
  title: string;
  content?: string;
  type: 'page' | 'article' | 'tip' | 'announcement';
  status: 'draft' | 'published' | 'archived';
  slug?: string;
  meta_description?: string;
  tags?: string[];
  featured_image?: string;
  author_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

class AdminAPIService {
  private async logError(error: any, action: string) {
    console.error(`AdminAPI Error in ${action}:`, error);
    
    // Log to audit table if possible
    try {
      await this.createAuditLog({
        action: `error_${action}`,
        resource_type: 'system',
        severity: 'high',
        new_values: { error: error.message || 'Unknown error' }
      });
    } catch (logError) {
      console.error('Failed to log error to audit table:', logError);
    }
  }

  private async createAuditLog(data: {
    admin_id?: string;
    action: string;
    resource_type: string;
    resource_id?: string;
    old_values?: any;
    new_values?: any;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }) {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          ...data,
          severity: data.severity || 'info'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to create audit log:', error);
    }
  }

  // Dashboard Analytics
  async getDashboardStats() {
    try {
      // Get user count
      const { count: userCount, error: userError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (userError) throw userError;

      // Get quiz count
      const { count: quizCount, error: quizError } = await supabase
        .from('quizzes')
        .select('*', { count: 'exact', head: true });

      if (quizError) throw quizError;

      // Get recent quiz results for completion rate
      const { data: recentResults, error: resultsError } = await supabase
        .from('quiz_results')
        .select('score')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (resultsError) throw resultsError;

      // Calculate average score
      const avgScore = recentResults?.length 
        ? recentResults.reduce((sum, result) => sum + result.score, 0) / recentResults.length
        : 0;

      // Get badge earned count
      const { count: badgeCount, error: badgeError } = await supabase
        .from('badges')
        .select('*', { count: 'exact', head: true });

      if (badgeError) throw badgeError;

      return {
        totalUsers: userCount || 0,
        totalQuizzes: quizCount || 0,
        averageScore: Math.round(avgScore),
        totalBadges: badgeCount || 0,
        recentActivity: recentResults?.length || 0
      };
    } catch (error) {
      await this.logError(error, 'getDashboardStats');
      throw error;
    }
  }

  // User Management
  async getUsers(page = 1, limit = 50, search = '') {
    try {
      let query = supabase
        .from('users')
        .select(`
          id,
          email,
          full_name,
          is_active,
          email_verified,
          created_at,
          updated_at,
          last_sign_in_at
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (search) {
        query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return {
        users: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      await this.logError(error, 'getUsers');
      throw error;
    }
  }

  async updateUserStatus(userId: string, isActive: boolean, adminId?: string) {
    try {
      const { data: oldUser } = await supabase
        .from('users')
        .select('is_active')
        .eq('id', userId)
        .single();

      const { error } = await supabase
        .from('users')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        admin_id: adminId,
        action: isActive ? 'user_activated' : 'user_deactivated',
        resource_type: 'user',
        resource_id: userId,
        old_values: { is_active: oldUser?.is_active },
        new_values: { is_active: isActive },
        severity: 'medium'
      });

      return true;
    } catch (error) {
      await this.logError(error, 'updateUserStatus');
      throw error;
    }
  }

  // Quiz Management
  async getQuizzes(page = 1, limit = 50) {
    try {
      const { data, count, error } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          description,
          difficulty,
          category,
          is_active,
          created_at,
          updated_at
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return {
        quizzes: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      await this.logError(error, 'getQuizzes');
      throw error;
    }
  }

  async getQuizAnalytics(quizId?: string) {
    try {
      let query = supabase
        .from('quiz_results')
        .select(`
          id,
          quiz_id,
          user_id,
          score,
          time_taken,
          completed_at,
          quizzes!inner(title)
        `);

      if (quizId) {
        query = query.eq('quiz_id', quizId);
      }

      const { data, error } = await query.order('completed_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      await this.logError(error, 'getQuizAnalytics');
      throw error;
    }
  }

  // Badge Management
  async getBadges() {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select(`
          id,
          name,
          description,
          icon_type,
          color,
          criteria,
          is_active,
          created_by,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get earned count for each badge - fallback to 0 if user_badges table doesn't exist
      const badgesWithCount = await Promise.all(
        (data || []).map(async (badge) => {
          try {
            const { count } = await supabase
              .from('user_badges')
              .select('*', { count: 'exact', head: true })
              .eq('badge_id', badge.id);

            return {
              ...badge,
              earned_count: count || 0
            };
          } catch {
            return {
              ...badge,
              earned_count: 0
            };
          }
        })
      );

      return badgesWithCount;
    } catch (error) {
      await this.logError(error, 'getBadges');
      throw error;
    }
  }

  async createBadge(badgeData: Omit<Badge, 'id' | 'created_at' | 'updated_at' | 'earned_count'>) {
    try {
      const { data, error } = await supabase
        .from('badges')
        .insert({
          ...badgeData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      await this.createAuditLog({
        admin_id: badgeData.created_by,
        action: 'badge_created',
        resource_type: 'badge',
        resource_id: data.id,
        new_values: badgeData,
        severity: 'low'
      });

      return data;
    } catch (error) {
      await this.logError(error, 'createBadge');
      throw error;
    }
  }

  async updateBadge(badgeId: string, badgeData: Partial<Badge>, adminId?: string) {
    try {
      const { data: oldBadge } = await supabase
        .from('badges')
        .select('*')
        .eq('id', badgeId)
        .single();

      const { data, error } = await supabase
        .from('badges')
        .update({
          ...badgeData,
          updated_by: adminId,
          updated_at: new Date().toISOString()
        })
        .eq('id', badgeId)
        .select()
        .single();

      if (error) throw error;

      await this.createAuditLog({
        admin_id: adminId,
        action: 'badge_updated',
        resource_type: 'badge',
        resource_id: badgeId,
        old_values: oldBadge,
        new_values: badgeData,
        severity: 'low'
      });

      return data;
    } catch (error) {
      await this.logError(error, 'updateBadge');
      throw error;
    }
  }

  async deleteBadge(badgeId: string, adminId?: string) {
    try {
      const { data: oldBadge } = await supabase
        .from('badges')
        .select('*')
        .eq('id', badgeId)
        .single();

      const { error } = await supabase
        .from('badges')
        .delete()
        .eq('id', badgeId);

      if (error) throw error;

      await this.createAuditLog({
        admin_id: adminId,
        action: 'badge_deleted',
        resource_type: 'badge',
        resource_id: badgeId,
        old_values: oldBadge,
        severity: 'medium'
      });

      return true;
    } catch (error) {
      await this.logError(error, 'deleteBadge');
      throw error;
    }
  }

  // Audit Logs
  async getAuditLogs(page = 1, limit = 50, filters: {
    action?: string;
    resource_type?: string;
    severity?: string;
    admin_id?: string;
    start_date?: string;
    end_date?: string;
  } = {}) {
    try {
      let query = supabase
        .from('audit_logs')
        .select(`
          id,
          admin_id,
          action,
          resource_type,
          resource_id,
          old_values,
          new_values,
          ip_address,
          user_agent,
          severity,
          created_at
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      // Apply filters
      if (filters.action) {
        query = query.eq('action', filters.action);
      }
      if (filters.resource_type) {
        query = query.eq('resource_type', filters.resource_type);
      }
      if (filters.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters.admin_id) {
        query = query.eq('admin_id', filters.admin_id);
      }
      if (filters.start_date) {
        query = query.gte('created_at', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('created_at', filters.end_date);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return {
        logs: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      await this.logError(error, 'getAuditLogs');
      throw error;
    }
  }

  // Content Management
  async getContentItems(page = 1, limit = 50, type?: string) {
    try {
      let query = supabase
        .from('content_items')
        .select(`
          id,
          title,
          content,
          type,
          status,
          slug,
          meta_description,
          tags,
          featured_image,
          author_id,
          published_at,
          created_at,
          updated_at
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (type) {
        query = query.eq('type', type);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return {
        items: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      await this.logError(error, 'getContentItems');
      throw error;
    }
  }

  async createContentItem(itemData: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert({
          ...itemData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      await this.createAuditLog({
        admin_id: itemData.author_id,
        action: 'content_created',
        resource_type: 'content',
        resource_id: data.id,
        new_values: itemData,
        severity: 'low'
      });

      return data;
    } catch (error) {
      await this.logError(error, 'createContentItem');
      throw error;
    }
  }

  async updateContentItem(itemId: string, itemData: Partial<ContentItem>, adminId?: string) {
    try {
      const { data: oldItem } = await supabase
        .from('content_items')
        .select('*')
        .eq('id', itemId)
        .single();

      const { data, error } = await supabase
        .from('content_items')
        .update({
          ...itemData,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;

      await this.createAuditLog({
        admin_id: adminId,
        action: 'content_updated',
        resource_type: 'content',
        resource_id: itemId,
        old_values: oldItem,
        new_values: itemData,
        severity: 'low'
      });

      return data;
    } catch (error) {
      await this.logError(error, 'updateContentItem');
      throw error;
    }
  }

  // Real-time activity feed
  async getRecentActivity(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id,
          action,
          resource_type,
          resource_id,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      await this.logError(error, 'getRecentActivity');
      return []; // Return empty array on error to prevent UI breaking
    }
  }
}

export const adminAPI = new AdminAPIService();

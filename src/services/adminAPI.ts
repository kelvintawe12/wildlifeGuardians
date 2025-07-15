import { createClient } from '@supabase/supabase-js';

// Use your actual Supabase configuration
const supabaseUrl = 'https://exwkogchbuuwzgcgtsnm.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4d2tvZ2NoYnV1d3pnY2d0c25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTQxNzcsImV4cCI6MjA2NzM3MDE3N30.cM5bMhsA7ITtaLfW2iUp57heiE0Zsg3PYLKoTj-WpPw';

// Create admin client with service role key for admin operations
export const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin API service for managing the platform
export class AdminAPIService {
  // User Management
  static async getAllUsers() {
    try {
      const { data, error } = await adminSupabase
        .from('profiles')
        .select(`
          *,
          users!inner(
            id,
            email,
            created_at,
            last_sign_in_at
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getUserStats() {
    try {
      const { count: totalUsers } = await adminSupabase
        .from('profiles')
        .select('*', { count: 'exact' });

      const { count: activeUsers } = await adminSupabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .gte('last_active', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const { count: totalQuizResults } = await adminSupabase
        .from('quiz_results')
        .select('*', { count: 'exact' });

      const { count: totalBadges } = await adminSupabase
        .from('user_badges')
        .select('*', { count: 'exact' });

      return {
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalQuizResults: totalQuizResults || 0,
        totalBadges: totalBadges || 0
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }

  static async updateUserStatus(userId: string, status: 'active' | 'inactive' | 'banned') {
    try {
      const { data, error } = await adminSupabase
        .from('profiles')
        .update({ status })
        .eq('id', userId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  // Quiz Management
  static async getAllQuizzes() {
    try {
      const { data, error } = await adminSupabase
        .from('quizzes')
        .select(`
          *,
          quiz_results(
            id,
            score,
            completed_at
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Calculate completion stats for each quiz
      const quizzesWithStats = data?.map(quiz => {
        const results = quiz.quiz_results || [];
        const completions = results.length;
        const averageScore = completions > 0 
          ? results.reduce((sum: number, result: any) => sum + result.score, 0) / completions 
          : 0;
        
        return {
          ...quiz,
          completions,
          averageScore: Math.round(averageScore * 10) / 10
        };
      });
      
      return quizzesWithStats;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  }

  static async getQuizAnalytics() {
    try {
      // Get quiz completion trends
      const { data: completionTrends } = await adminSupabase
        .from('quiz_results')
        .select('completed_at, score')
        .order('completed_at', { ascending: true });

      // Get top performing quizzes
      const { data: topQuizzes } = await adminSupabase
        .from('quizzes')
        .select(`
          id,
          title,
          quiz_results(score, completed_at)
        `);

      return {
        completionTrends: completionTrends || [],
        topQuizzes: topQuizzes || []
      };
    } catch (error) {
      console.error('Error fetching quiz analytics:', error);
      throw error;
    }
  }

  // Badge Management
  static async getAllBadges() {
    try {
      const { data, error } = await adminSupabase
        .from('badges')
        .select(`
          *,
          user_badges(
            id,
            earned_at,
            profiles(name)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching badges:', error);
      throw error;
    }
  }

  static async getBadgeStats() {
    try {
      const { data: badgeStats } = await adminSupabase
        .from('badges')
        .select(`
          id,
          name,
          user_badges(id)
        `);

      const totalUsers = await this.getUserStats();
      
      const statsWithPercentage = badgeStats?.map(badge => ({
        ...badge,
        issued: badge.user_badges?.length || 0,
        percentage: totalUsers.totalUsers > 0 
          ? Math.round(((badge.user_badges?.length || 0) / totalUsers.totalUsers) * 100)
          : 0
      }));

      return statsWithPercentage || [];
    } catch (error) {
      console.error('Error fetching badge stats:', error);
      throw error;
    }
  }

  // Animals Management
  static async getAllAnimals() {
    try {
      const { data, error } = await adminSupabase
        .from('animals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  }

  // Recent Activity
  static async getRecentActivity(limit = 20) {
    try {
      // Get recent quiz completions
      const { data: recentQuizzes } = await adminSupabase
        .from('quiz_results')
        .select(`
          id,
          completed_at,
          score,
          profiles!inner(name),
          quizzes!inner(title)
        `)
        .order('completed_at', { ascending: false })
        .limit(limit);

      // Get recent badge earnings
      const { data: recentBadges } = await adminSupabase
        .from('user_badges')
        .select(`
          id,
          earned_at,
          profiles!inner(name),
          badges!inner(name)
        `)
        .order('earned_at', { ascending: false })
        .limit(limit);

      // Get recent user registrations
      const { data: recentUsers } = await adminSupabase
        .from('profiles')
        .select('id, created_at, name')
        .order('created_at', { ascending: false })
        .limit(limit);

      // Combine and sort all activities
      const activities = [
        ...(recentQuizzes?.map(item => ({
          id: `quiz-${item.id}`,
          type: 'quiz_completion' as const,
          description: `${(item.profiles as any)?.name} completed "${(item.quizzes as any)?.title}" with ${item.score}% score`,
          timestamp: new Date(item.completed_at),
          user: (item.profiles as any)?.name
        })) || []),
        ...(recentBadges?.map(item => ({
          id: `badge-${item.id}`,
          type: 'badge_earned' as const,
          description: `${(item.profiles as any)?.name} earned "${(item.badges as any)?.name}" badge`,
          timestamp: new Date(item.earned_at),
          user: (item.profiles as any)?.name
        })) || []),
        ...(recentUsers?.map(item => ({
          id: `user-${item.id}`,
          type: 'user_registration' as const,
          description: `New user registered: ${item.name}`,
          timestamp: new Date(item.created_at),
          user: item.name
        })) || [])
      ];

      return activities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  }

  // System Analytics
  static async getSystemAnalytics() {
    try {
      const userStats = await this.getUserStats();
      
      // Get user growth over last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const { data: userGrowth } = await adminSupabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', sixMonthsAgo.toISOString())
        .order('created_at', { ascending: true });

      // Process user growth data by month
      const monthlyGrowth = userGrowth?.reduce((acc, user) => {
        const month = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return {
        userStats,
        userGrowth: Object.entries(monthlyGrowth).map(([month, count]) => ({
          month,
          users: count
        }))
      };
    } catch (error) {
      console.error('Error fetching system analytics:', error);
      throw error;
    }
  }

  // Content Management
  static async createQuiz(quizData: any) {
    try {
      const { data, error } = await adminSupabase
        .from('quizzes')
        .insert([quizData]);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  }

  static async updateQuiz(quizId: string, updates: any) {
    try {
      const { data, error } = await adminSupabase
        .from('quizzes')
        .update(updates)
        .eq('id', quizId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  }

  static async deleteQuiz(quizId: string) {
    try {
      const { data, error } = await adminSupabase
        .from('quizzes')
        .delete()
        .eq('id', quizId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  }
}

export default AdminAPIService;

import React from 'react';
import { BookOpenIcon, ExternalLinkIcon } from 'lucide-react';
interface ContentItem {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}
interface EducationalContentProps {
  title: string;
  items: ContentItem[];
}
const EducationalContent: React.FC<EducationalContentProps> = ({
  title,
  items
}) => {
  return <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
        <BookOpenIcon className="h-5 w-5 mr-2 text-green-600" />
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                  Learn more <ExternalLinkIcon className="h-4 w-4 ml-1" />
                </a>}
            </div>
          </div>)}
      </div>
    </div>;
};
export default EducationalContent;
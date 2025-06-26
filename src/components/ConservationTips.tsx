import React from 'react';
import { LeafIcon, DropletIcon, BatteryChargingIcon, RecycleIcon, TrashIcon } from 'lucide-react';
const ConservationTips: React.FC = () => {
  const tips = [{
    icon: <LeafIcon className="h-8 w-8 text-green-500" />,
    title: 'Plant Native Species',
    description: 'Native plants provide food and habitat for local wildlife and require less water and maintenance.'
  }, {
    icon: <DropletIcon className="h-8 w-8 text-blue-500" />,
    title: 'Conserve Water',
    description: 'Take shorter showers, fix leaks, and water plants in the early morning or evening to reduce evaporation.'
  }, {
    icon: <BatteryChargingIcon className="h-8 w-8 text-yellow-500" />,
    title: 'Save Energy',
    description: 'Turn off lights when not in use, unplug electronics, and use energy-efficient appliances.'
  }, {
    icon: <RecycleIcon className="h-8 w-8 text-blue-600" />,
    title: 'Recycle Properly',
    description: 'Learn what can be recycled in your area and make sure to clean items before recycling them.'
  }, {
    icon: <TrashIcon className="h-8 w-8 text-red-500" />,
    title: 'Reduce Waste',
    description: 'Use reusable bags, water bottles, and containers to minimize single-use plastics.'
  }];
  return <div className="bg-green-50 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Conservation Tips for Young Guardians
      </h2>
      <p className="text-gray-600 mb-6">
        Small actions can make a big difference for wildlife conservation. Here
        are some ways you can help:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{tip.icon}</div>
              <h3 className="font-medium text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          </div>)}
      </div>
    </div>;
};
export default ConservationTips;
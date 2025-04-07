import React, { useState, useEffect } from 'react';
import { Applications, Application } from './Applications';
import { useNavigation } from '@react-navigation/native';
import { ApplicationsScreenNavigationProp } from '@/Types/navigation';

// Mock data for applications
const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'React Native Developer',
    company: 'Tech Solutions Inc.',
    appliedDate: 'May 15, 2023',
    status: 'Interview',
    progress: 75
  },
  {
    id: '2',
    jobTitle: 'Mobile App Designer',
    company: 'Creative Studio',
    appliedDate: 'May 10, 2023',
    status: 'Reviewing',
    progress: 40
  },
  {
    id: '3',
    jobTitle: 'Frontend Developer Intern',
    company: 'StartUp Vietnam',
    appliedDate: 'May 5, 2023',
    status: 'Rejected',
    progress: 100
  },
  {
    id: '4',
    jobTitle: 'UI/UX Designer',
    company: 'Digital Agency',
    appliedDate: 'May 20, 2023',
    status: 'Applied',
    progress: 20
  },
  {
    id: '5',
    jobTitle: 'Mobile Developer',
    company: 'FinTech Solutions',
    appliedDate: 'May 18, 2023',
    status: 'Offer',
    progress: 100
  }
];

export const ApplicationsContainer = () => {
  const navigation = useNavigation<ApplicationsScreenNavigationProp>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplicationPress = (applicationId: string) => {
    // Navigate to application details (to be implemented)
    console.log(`Navigate to application details for ID: ${applicationId}`);
  };

  // Simulate loading applications from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApplications(mockApplications);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Applications 
      applications={applications}
      isLoading={isLoading}
      onApplicationPress={handleApplicationPress}
    />
  );
};

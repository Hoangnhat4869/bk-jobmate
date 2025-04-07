import React, { useState, useEffect } from 'react';
import { Jobs, Job } from './Jobs';
import { useNavigation } from '@react-navigation/native';
import { JobsScreenNavigationProp } from '@/Types/navigation';

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'React Native Developer',
    company: 'Tech Solutions Inc.',
    location: 'Ho Chi Minh City',
    salary: '$1,500 - $2,500/month',
    postedDate: '2 days ago',
    type: 'Full-time',
    description: 'We are looking for a React Native developer to join our team...'
  },
  {
    id: '2',
    title: 'Mobile App Designer',
    company: 'Creative Studio',
    location: 'Ho Chi Minh City',
    salary: '$1,200 - $1,800/month',
    postedDate: '1 week ago',
    type: 'Full-time',
    description: 'Join our design team to create beautiful mobile experiences...'
  },
  {
    id: '3',
    title: 'Frontend Developer Intern',
    company: 'StartUp Vietnam',
    location: 'Hanoi',
    salary: '$500 - $800/month',
    postedDate: '3 days ago',
    type: 'Internship',
    description: 'Great opportunity for students to gain real-world experience...'
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Digital Agency',
    location: 'Remote',
    salary: '$1,800 - $2,200/month',
    postedDate: '5 days ago',
    type: 'Contract',
    description: 'Looking for a talented UI/UX designer for our digital products...'
  },
  {
    id: '5',
    title: 'Mobile Developer',
    company: 'FinTech Solutions',
    location: 'Da Nang',
    salary: '$1,400 - $2,000/month',
    postedDate: '1 day ago',
    type: 'Full-time',
    description: 'Join our team to build innovative financial applications...'
  }
];

export const JobsContainer = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [isLoading, setIsLoading] = useState(false);

  const handleJobPress = (jobId: string) => {
    // Navigate to job details (to be implemented)
    console.log(`Navigate to job details for job ID: ${jobId}`);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  };

  const handleFilter = () => {
    // Open filter modal (to be implemented)
    console.log('Open filter modal');
  };

  // Simulate loading jobs from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Jobs 
      jobs={filteredJobs}
      isLoading={isLoading}
      onJobPress={handleJobPress}
      onSearch={handleSearch}
      onFilter={handleFilter}
    />
  );
};

import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Heading, 
  Badge, 
  Icon,
  Progress,
  Divider
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'Offer' | 'Rejected';
  progress: number; // 0-100
}

export interface IApplicationsProps {
  applications: Application[];
  isLoading: boolean;
  onApplicationPress: (applicationId: string) => void;
}

export const Applications = (props: IApplicationsProps) => {
  const { applications, isLoading, onApplicationPress } = props;

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied': return 'info';
      case 'Reviewing': return 'warning';
      case 'Interview': return 'indigo';
      case 'Offer': return 'success';
      case 'Rejected': return 'danger';
      default: return 'info';
    }
  };

  const renderApplicationItem = ({ item }: { item: Application }) => (
    <TouchableOpacity onPress={() => onApplicationPress(item.id)}>
      <Box 
        bg="white" 
        p={4} 
        mb={3} 
        borderRadius="md" 
        shadow={1}
      >
        <VStack space={2}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">{item.jobTitle}</Heading>
            <Badge colorScheme={getStatusColor(item.status)}>
              {item.status}
            </Badge>
          </HStack>
          
          <Text color="gray.600">{item.company}</Text>
          
          <HStack space={1} alignItems="center">
            <Icon as={Ionicons} name="calendar-outline" size="xs" color="gray.500" />
            <Text fontSize="xs" color="gray.500">Applied on {item.appliedDate}</Text>
          </HStack>
          
          <VStack space={1} mt={1}>
            <HStack justifyContent="space-between">
              <Text fontSize="xs" color="gray.500">Application Progress</Text>
              <Text fontSize="xs" color="gray.500">{item.progress}%</Text>
            </HStack>
            <Progress value={item.progress} size="xs" colorScheme={getStatusColor(item.status)} />
          </VStack>
          
          <Divider my={1} />
          
          <HStack justifyContent="flex-end">
            <TouchableOpacity>
              <HStack space={1} alignItems="center">
                <Text fontSize="xs" color="primary.600">View Details</Text>
                <Icon as={Ionicons} name="chevron-forward" size="xs" color="primary.600" />
              </HStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Box p={4} bg="white">
        <Heading size="md">My Applications</Heading>
        <Text color="gray.500" mt={1}>Track your job applications</Text>
      </Box>
      
      <FlatList
        data={applications}
        renderItem={renderApplicationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Input, 
  Icon, 
  Heading, 
  Badge, 
  Divider,
  Button
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
}

export interface IJobsProps {
  jobs: Job[];
  isLoading: boolean;
  onJobPress: (jobId: string) => void;
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export const Jobs = (props: IJobsProps) => {
  const { jobs, isLoading, onJobPress, onSearch, onFilter } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity onPress={() => onJobPress(item.id)}>
      <Box 
        bg="white" 
        p={4} 
        mb={3} 
        borderRadius="md" 
        shadow={1}
      >
        <VStack space={2}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">{item.title}</Heading>
            <Badge colorScheme={
              item.type === 'Full-time' ? 'green' : 
              item.type === 'Part-time' ? 'blue' : 
              item.type === 'Contract' ? 'orange' : 'purple'
            }>
              {item.type}
            </Badge>
          </HStack>
          
          <Text color="gray.600">{item.company}</Text>
          
          <HStack space={4}>
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="location-outline" size="xs" color="gray.500" />
              <Text fontSize="xs" color="gray.500">{item.location}</Text>
            </HStack>
            
            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="cash-outline" size="xs" color="gray.500" />
              <Text fontSize="xs" color="gray.500">{item.salary}</Text>
            </HStack>
          </HStack>
          
          <Divider my={1} />
          
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="xs" color="gray.500">Posted {item.postedDate}</Text>
            <Button size="xs" variant="ghost" rightIcon={
              <Icon as={Ionicons} name="chevron-forward" size="xs" />
            }>
              View Details
            </Button>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Box p={4} bg="white">
        <HStack space={2} alignItems="center">
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={handleSearch}
            flex={1}
            borderRadius="full"
            py={2}
            px={3}
            fontSize={14}
            InputLeftElement={
              <Icon 
                as={Ionicons} 
                name="search" 
                size={5} 
                ml={2} 
                color="gray.400" 
              />
            }
          />
          <TouchableOpacity onPress={onFilter}>
            <Box p={2} borderRadius="full" bg="gray.100">
              <Icon as={Ionicons} name="options-outline" size={5} color="gray.600" />
            </Box>
          </TouchableOpacity>
        </HStack>
      </Box>
      
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
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

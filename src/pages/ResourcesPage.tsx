
import { useState } from 'react';
import Layout from '@/components/Layout';
import ResourceCard, { ResourceInfo, ResourceCategory } from '@/components/ResourceCard';
import { BookOpen, Filter, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const resources: ResourceInfo[] = [
  {
    id: '1',
    title: 'Emergency Preparedness Guide',
    category: 'guide',
    description: 'A comprehensive guide for preparing your home and family for various types of disasters. Includes checklists, emergency contact information templates, and step-by-step preparedness plans.',
    fileType: 'pdf',
    downloadable: true,
    url: '#',
  },
  {
    id: '2',
    title: 'Flood Safety Training',
    category: 'training',
    description: 'Interactive online training course on flood safety procedures, including evacuation protocols, water safety, and post-flood recovery best practices.',
    fileType: 'video',
    url: '#',
  },
  {
    id: '3',
    title: 'Earthquake Survival Kit Checklist',
    category: 'guide',
    description: 'Essential items to include in your earthquake preparedness kit. Designed for families of various sizes with additional considerations for pets, elderly, and individuals with special needs.',
    fileType: 'pdf',
    downloadable: true,
    url: '#',
  },
  {
    id: '4',
    title: 'Disaster Alert Mobile App',
    category: 'tool',
    description: 'Official mobile application that provides real-time alerts for various disasters in your area. Features include interactive maps, evacuation routes, and shelter locations.',
    fileType: 'app',
    url: '#',
  },
  {
    id: '5',
    title: 'Understanding Hurricane Categories',
    category: 'education',
    description: 'Educational material explaining hurricane strength classifications, associated wind speeds, potential damage, and appropriate safety measures for each category.',
    fileType: 'pdf',
    downloadable: true,
    url: '#',
  },
  {
    id: '6',
    title: 'Community Resilience Framework',
    category: 'report',
    description: 'Research report on building community resilience to disasters, including case studies, success stories, and recommendations for community leaders and organizations.',
    fileType: 'pdf',
    downloadable: true,
    url: '#',
  },
  {
    id: '7',
    title: 'Wildfire Prevention Techniques',
    category: 'education',
    description: 'Educational resources on preventing wildfires and creating defensible spaces around your property. Includes seasonal maintenance guidelines and local regulations.',
    fileType: 'link',
    url: '#',
  },
  {
    id: '8',
    title: 'First Aid for Disaster Situations',
    category: 'training',
    description: 'Training materials on providing first aid during disaster situations when professional medical help may be delayed. Covers common injuries and basic life support skills.',
    fileType: 'video',
    url: '#',
  },
  {
    id: '9',
    title: 'Disaster Recovery Planning',
    category: 'guide',
    description: 'Guide for individuals and families on recovering from disasters, including dealing with insurance, rebuilding, and addressing mental health challenges after traumatic events.',
    fileType: 'pdf',
    downloadable: true,
    url: '#',
  },
];

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredResources = () => {
    return resources.filter((resource) => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesFileType = selectedFileType === 'all' || resource.fileType === selectedFileType;
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'downloadable' && resource.downloadable) ||
                        (activeTab === resource.category);
      
      return matchesSearch && matchesCategory && matchesFileType && matchesTab;
    });
  };

  const filteredResources = getFilteredResources();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <BookOpen className="mr-2 h-8 w-8 text-primary" />
                Resources & Guides
              </h1>
              <p className="text-muted-foreground">
                Educational materials and tools for disaster preparedness
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ResourceCategory | 'all')}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Resource Category</SelectLabel>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="guide">Guides</SelectItem>
                      <SelectItem value="tool">Tools</SelectItem>
                      <SelectItem value="education">Educational</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="report">Reports</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>File Type</SelectLabel>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pdf">PDF Documents</SelectItem>
                      <SelectItem value="video">Video Content</SelectItem>
                      <SelectItem value="link">Web Resources</SelectItem>
                      <SelectItem value="app">Applications</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full max-w-4xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="education">Educational</TabsTrigger>
              <TabsTrigger value="tool">Tools</TabsTrigger>
              <TabsTrigger value="report">Reports</TabsTrigger>
              <TabsTrigger value="downloadable" className="flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                Downloadable
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  className={`animate-fade-up animate-delay-${index % 3 * 100}`}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground">
                  No resources match your current search criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;

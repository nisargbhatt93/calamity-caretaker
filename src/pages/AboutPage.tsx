
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Users, Globe, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">About DisasterGuard</h1>
            <p className="text-muted-foreground">
              Our mission, vision, and commitment to disaster management excellence
            </p>
          </div>

          {/* Mission & Vision */}
          <Card className="mb-12 animate-fade-up">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>What drives our disaster management platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                DisasterGuard is dedicated to empowering communities with the tools, information, and resources they need to effectively prepare for, respond to, and recover from disasters. We believe that through education, preparedness, and coordinated response, we can minimize the impact of disasters and save lives.
              </p>
              <p>
                Our vision is a world where communities are resilient in the face of disasters, where individuals are well-informed and prepared, and where recovery is swift and effective. We strive to be the leading platform for disaster management solutions, setting the standard for excellence in this critical field.
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <div className="mb-12 animate-fade-up animate-delay-100">
            <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-primary" />
                    Preparedness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe that preparation is key to reducing the impact of disasters. We provide comprehensive resources for individuals and communities to prepare effectively.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Timeliness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In disaster situations, time is of the essence. We deliver accurate information quickly to help communities respond effectively when every minute counts.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in the power of community resilience. Our platform fosters cooperation and coordination among individuals, organizations, and agencies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How We Help */}
          <div className="mb-12 animate-fade-up animate-delay-200">
            <h2 className="text-2xl font-bold mb-6">How We Help</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-primary/10 rounded-full p-4 shrink-0">
                  <span className="text-2xl">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Disaster Monitoring</h3>
                  <p className="text-muted-foreground">
                    Our platform provides up-to-date information on active disasters, including their location, severity, and development. We source data from reliable agencies and authorities to ensure accuracy.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-primary/10 rounded-full p-4 shrink-0">
                  <span className="text-2xl">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                  <p className="text-muted-foreground">
                    We provide comprehensive guides, training materials, and resources to help individuals and communities prepare for various types of disasters. Knowledge is a critical component of effective disaster management.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-primary/10 rounded-full p-4 shrink-0">
                  <span className="text-2xl">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Emergency Response Coordination</h3>
                  <p className="text-muted-foreground">
                    During active disasters, our platform facilitates communication and coordination between affected individuals, emergency services, and relief organizations, helping to streamline response efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-12 animate-fade-up animate-delay-300">
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <p className="text-muted-foreground mb-6">
              DisasterGuard is powered by a dedicated team of experts in disaster management, emergency response, meteorology, technology, and community outreach. Our diverse backgrounds and expertise enable us to address the complex challenges of disaster preparedness and response.
            </p>
            <p className="text-muted-foreground">
              Our team members have extensive experience in disaster management, having worked with government agencies, non-profit organizations, and in the private sector. We are committed to continuing education and staying at the forefront of best practices in disaster management.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-up animate-delay-400">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're an individual looking to prepare yourself and your family, or an organization seeking to enhance your disaster management capabilities, DisasterGuard is here to help. Explore our resources and start your journey toward disaster resilience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="gap-2">
                  Explore Resources
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/disasters">
                <Button variant="outline" size="lg">
                  View Current Disasters
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

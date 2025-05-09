
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
            
            <Tabs defaultValue="general">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">Change Picture</Button>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="studentId">Student ID</Label>
                          <Input id="studentId" defaultValue="ST12345678" readOnly className="bg-muted" />
                        </div>
                        <div>
                          <Label htmlFor="program">Program</Label>
                          <Input id="program" defaultValue="Bachelor of Computer Science" readOnly className="bg-muted" />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" placeholder="Tell us about yourself..." />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update your contact details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@tut.ac.za" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="012 345 6789" />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue="123 University Road, Pretoria" />
                    </div>
                    <div>
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input id="emergency" defaultValue="Jane Doe, 987 654 3210" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <input type="checkbox" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Portal Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications in portal</p>
                        </div>
                        <input type="checkbox" defaultChecked />
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-6">
                      <h3 className="font-medium mb-2">Notify me about:</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="grades" className="mr-2" defaultChecked />
                          <label htmlFor="grades">New grades</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="assignments" className="mr-2" defaultChecked />
                          <label htmlFor="assignments">Assignment deadlines</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="resources" className="mr-2" defaultChecked />
                          <label htmlFor="resources">New resources</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="events" className="mr-2" defaultChecked />
                          <label htmlFor="events">Campus events</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;

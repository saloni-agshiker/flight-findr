import { useState } from "react";
import { User, Mail, MapPin, Globe, Camera, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { toast } from "sonner";


const availableInterests = [
  "Surfing", "Yoga", "Photography", "Hiking", "Skiing", 
  "Food & Dining", "Museums", "Nightlife", "Shopping",
  "Beach", "Adventure Sports", "Wildlife", "History",
  "Art", "Music", "Camping", "Diving"
];

const availableLanguages = [
  "English", "Spanish", "French", "German", "Mandarin",
  "Japanese", "Korean", "Portuguese", "Arabic", "Hindi"
];

export function ProfilePage({ currentUser, onUpdateProfile }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: currentUser.name,
    email: currentUser.email,
    phone: "",
    location: "",
    college: "",
    bio: "",
    interests: [],
    languages: ["English"],
    profileImage: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400`
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!profile.name || !profile.email) {
      toast.error("Name and email are required");
      return;
    }

    onUpdateProfile(profile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const toggleInterest = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleLanguage = (language) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl mb-2">My Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            {isEditing && (
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Upload a new profile picture</p>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <Input
                id="college"
                placeholder="e.g., Stanford University"
                value={profile.college}
                onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell others about yourself, your travel style, and what you're looking for in a travel buddy..."
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>Select your travel interests and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => (
              <Badge
                key={interest}
                variant={profile.interests.includes(interest) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  isEditing ? "hover:bg-teal-100" : "cursor-default"
                } ${
                  profile.interests.includes(interest) 
                    ? "bg-teal-500 hover:bg-teal-600 text-white" 
                    : ""
                }`}
                onClick={() => isEditing && toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Languages you speak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map((language) => (
              <Badge
                key={language}
                variant={profile.languages.includes(language) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  isEditing ? "hover:bg-cyan-100" : "cursor-default"
                } ${
                  profile.languages.includes(language) 
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                    : ""
                }`}
                onClick={() => isEditing && toggleLanguage(language)}
              >
                <Globe className="w-3 h-3 mr-1" />
                {language}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

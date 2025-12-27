import { useState } from "react";
import { User, Mail, MapPin, Globe, Camera, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

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

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();

  const [profile, setProfile] = useState(() => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
    college: user?.college ?? "",
    residence: user?.residence ?? "",
    bio: user?.bio ?? "",
    languages: user?.languages ?? [],
    profilePic: user?.profilePic ?? "",
  }));

  async function handleSave(e) {
    e.preventDefault();

    if (!profile.name || !profile.email) {
      toast.error("Name and email are required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {})},
        body: JSON.stringify({ 
          name: profile.name,
          email: profile.email,
          college: profile.college,
          residence: profile.residence,
          bio: profile.bio,
          languages: profile.languages,
          profilePic: profile.profilePic
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
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
                src={ user?.profilePic || "../logo.svg"} 
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
                value={user?.name}
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
                value={user?.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <Input
                id="college"
                placeholder="e.g., Stanford University"
                value={user?.college}
                onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Residence</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={user?.location}
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
              value={user?.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
            />
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
                variant={user?.languages.includes(language) ? "default" : "outline"}
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

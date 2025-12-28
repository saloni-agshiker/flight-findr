import { useState } from "react";
import { Plane, MapPin, Users, Heart, LogOut, User, Briefcase, MessageCircle, Settings } from "lucide-react";
import { TravelerCard, Traveler } from "../components/TravelerCard";
import { ProfileDialog } from "../components/ProfileDialog";
import { FilterBar } from "../components/FilterBar";
import { ProfilePage, UserProfile } from "../components/ProfilePage";
import { TripsPage } from "../components/TripsPage";
import { ChatPage } from "../components/ChatPage";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Home() {
    const navigate = useNavigate();
    const { user, login, logout } = useAuth();

   // Navigation tab states
   const [currentPage, setCurrentPage] = useState("browse");

   // Filter bar states
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedDestination, setSelectedDestination] = useState("");
   const [selectedStyle, setSelectedStyle] = useState("");

   // Profile page states
   const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    async function handleLogout(e) {
        e.preventDefault();
        logout();
        toast.success(`Successfully logged out!`);
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
            <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl">TravelBuddy</h1>
                    <p className="text-xs text-muted-foreground">Find your perfect travel companion</p>
                </div>
                </div>
                <div className="flex items-center gap-2">
                <div className="hidden md:block text-sm text-muted-foreground mr-2">
                    Welcome, {user?.name ?? ""}!
                </div>
                <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Saved</span>
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setProfileDialogOpen(true)}
                    className="bg-teal-50 border-teal-200 hover:bg-teal-100"
                >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
                </div>
            </div>
            </div>
            </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 text-white py-12">
            <div className="container mx-auto px-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl mb-3">Discover Your Next Travel Adventure</h2>
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Connect with like-minded travelers, share experiences, and explore the world together
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center">
                <Tabs value={currentPage} onValueChange={setCurrentPage} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="browse" className="data-[state=active]:bg-white data-[state=active]:text-teal-600">
                    <Users className="w-4 h-4 mr-2" />
                    Browse
                    </TabsTrigger>
                    <TabsTrigger value="trips" className="data-[state=active]:bg-white data-[state=active]:text-teal-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    My Trips
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:text-teal-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                    </TabsTrigger>
                </TabsList>
                </Tabs>
            </div>
            </div>
        </section>

        {currentPage === "browse" && (
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDestination={selectedDestination}
                onDestinationChange={setSelectedDestination}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
            />
        )}

        {currentPage === "trips" && (
        <TripsPage />
        )}

        {currentPage === "chat" && (
        <ChatPage />
        )}

        <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>My Profile</DialogTitle>
            </DialogHeader>
            <ProfilePage/>
            </DialogContent>
        </Dialog>

            
      </div>
    );
}
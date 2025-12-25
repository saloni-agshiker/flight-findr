import { MapPin, Calendar, Heart, MessageCircle, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";


export function TravelerCard({ traveler, onConnect, onViewProfile }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      {/* Destination Image */}
      <div className="relative h-48 overflow-hidden" onClick={() => onViewProfile(traveler)}>
        <img 
          src={traveler.destinationImage} 
          alt={traveler.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-black hover:bg-white">
            {traveler.travelStyle[0]}
          </Badge>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4" onClick={() => onViewProfile(traveler)}>
        {/* User Info */}
        <div className="flex items-start gap-3 mb-3">
          <img 
            src={traveler.image}
            alt={traveler.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{traveler.name}, {traveler.age}</h3>
              {traveler.verified && (
                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 0L12.39 6.26L19.18 6.26L13.82 10.48L16.18 16.74L10 12.52L3.82 16.74L6.18 10.48L0.82 6.26L7.61 6.26L10 0Z"/>
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{traveler.location}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{traveler.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{traveler.startDate} - {traveler.endDate}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {traveler.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {traveler.interests.slice(0, 3).map((interest, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
          {traveler.interests.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{traveler.interests.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onConnect(traveler.id);
          }}
          className="flex-1"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Connect
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

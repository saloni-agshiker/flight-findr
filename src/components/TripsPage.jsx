import { useState } from "react";
import { Plus, Plane, Calendar, Clock, MapPin, Users, Car, Bus, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const transportModes = ["Personal car", "Rideshare", "Public transit", "Other"];

const normalizeArr = (array) =>
  Array.isArray(array) ? array : [];

// Frontend ↔ Backend enum mapping
const TRANSPORT_OPTIONS = [
  { label: "Personal car", value: "Personal car" },
  { label: "Rideshare (Uber/Lyft)", value: "Rideshare" },
  { label: "Public bus", value: "Public transit" },
  { label: "Public train", value: "Public transit" },
  { label: "Other", value: "Other" },
];

export function TripsPage() {
  const [trips, setTrips] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch(`http://localhost:5001/api/trips?userId=${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", 
        },
        });

        if (!res.ok) throw new Error("Failed to fetch trips");
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        alert(err.message);
        setTrips([]);
      }
    }
    fetchTrips();
  }, []);

  const [newTripData, setNewTripData] = useState(() => ({
    airline: "",
    flightNum: "",
    depAirport: "",
    arrAirport: "",
    depDate: "",
    depTime: "",
    arrDate: "",
    arrTime: "",
    timeDepToAirport: "",
    transportMode: "",
    addNotes: ""
  }));

  const getTransportIcon = (mode) => {
    switch (mode) {
      case "car": return <Car className="w-4 h-4" />;
      case "bus": return <Bus className="w-4 h-4" />;
      case "rideshare": return <Users className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  async function handleAddTrip(e) {
    e.preventDefault();

  }

  async function handleEditTrip(e) {
    e.preventDefault();
  }

  async function handleDeleteTrip(e) {
    e.preventDefault();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl mb-2">My Trips</h2>
          <p className="text-muted-foreground">Manage your upcoming travel plans and find travel buddies</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          {/* if (!open) resetForm(); FIX LATER */}
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTrip ? "Edit Trip" : "Add New Trip"}</DialogTitle>
              <DialogDescription>
                Enter your trip details to find travel companions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Flight Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Flight Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="airline">Airline *</Label>
                    <Input
                      id="airline"
                      placeholder="e.g., United Airlines"
                      value={newTripData.airline}
                      onChange={(e) => setNewTripData({ ...newTripData, airline: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightNumber">Flight Number</Label>
                    <Input
                      id="flightNumber"
                      placeholder="e.g., UA1234"
                      value={newTripData.flightNum}
                      onChange={(e) => setNewTripData({ ...newTripData, flightNum: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureAirport">Departure Airport *</Label>
                    <Input
                      id="departureAirport"
                      placeholder="e.g., ATL"
                      value={newTripData.depAirport}
                      onChange={(e) => setNewTripData({ ...newTripData, depAirport: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalAirport">Arrival Airport *</Label>
                    <Input
                      id="arrivalAirport"
                      placeholder="e.g., EWR"
                      value={newTripData.arrAirport}
                      onChange={(e) => setNewTripData({ ...newTripData, arrAirport: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Departure Date *</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={newTripData.depDate}
                      onChange={(e) => setNewTripData({ ...newTripData, depDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Departure Time *</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={newTripData.depTime}
                      onChange={(e) => setNewTripData({ ...newTripData, depTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="arrivalDate">Arrival Date</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={newTripData.arrDate}
                      onChange={(e) => setNewTripData({ ...newTripData, arrDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">Arrival Time</Label>
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={newTripData.arrTime}
                      onChange={(e) => setNewTripData({ ...newTripData, arrTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* College Transportation */}
              <div className="space-y-4">
                <h3 className="font-semibold">Transportation to Airport</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaveCollegeTime">Time Leaving College</Label>
                    <Input
                      id="leaveCollegeTime"
                      type="time"
                      value={newTripData.timeDepToAirport}
                      onChange={(e) => setNewTripData({ ...newTripData, timeDepToAirport: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transportMode">Mode of Transportation</Label>
                    <Select 
                      value={newTripData.transportMode} 
                      onValueChange={(value) => setNewTripData({ ...newTripData, transportMode: value })}
                    >
                    <option value="">Select mode</option>
                    {TRANSPORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Group Matching
              <div className="space-y-4">
                <h3 className="font-semibold">Group Matching Preferences</h3>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="openToGroupMatching"
                    checked={formData.openToGroupMatching}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      openToGroupMatching: e.target.checked 
                    })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="openToGroupMatching" className="cursor-pointer">
                    Open to group matching (2-4 people)
                  </Label>
                </div>

                {formData.openToGroupMatching && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="openSeats">Open Seats Available</Label>
                      <Select 
                        value={formData.openSeats?.toString()} 
                        onValueChange={(value) => setFormData({ ...formData, openSeats: parseInt(value) })}
                      >
                        <SelectTrigger id="openSeats">
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 seat</SelectItem>
                          <SelectItem value="2">2 seats</SelectItem>
                          <SelectItem value="3">3 seats</SelectItem>
                          <SelectItem value="4">4 seats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxGroupSize">Max Group Size</Label>
                      <Select 
                        value={formData.maxGroupSize?.toString()} 
                        onValueChange={(value) => setFormData({ ...formData, maxGroupSize: parseInt(value) })}
                      >
                        <SelectTrigger id="maxGroupSize">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 people</SelectItem>
                          <SelectItem value="3">3 people</SelectItem>
                          <SelectItem value="4">4 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              */}
              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input
                  id="notes"
                  placeholder="Any additional details about your trip..."
                  value={newTripData.addNotes}
                  onChange={(e) => setNewTripData({ ...newTripData, addNotes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                {/* resetForm(); FIX LATER */}
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddTrip}>
                {editingTrip ? "Update Trip" : "Add Trip"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trips List */}
      {trips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Plane className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl mb-2">No trips yet</h3>
            <p className="text-muted-foreground mb-4">Add your first trip to start finding travel buddies</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {trips.map((trip) => (
            <Card key={trip.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Plane className="w-5 h-5 text-teal-600" />
                      <h3 className="text-xl">
                        {trip.airline} {trip.flightNumber && `- ${trip.flightNumber}`}
                      </h3>
                      {trip.openToGroupMatching && (
                        <Badge className="bg-cyan-500">
                          <Users className="w-3 h-3 mr-1" />
                          Group Trip
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.departureAirport} → {trip.arrivalAirport}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditTrip(trip)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Departure */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Departure</p>
                      <p className="font-medium">{trip.departureDate}</p>
                      <p className="text-sm">{trip.departureTime}</p>
                    </div>
                  </div>

                  {/* Arrival */}
                  {trip.arrivalDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="font-medium">{trip.arrivalDate}</p>
                        {trip.arrivalTime && <p className="text-sm">{trip.arrivalTime}</p>}
                      </div>
                    </div>
                  )}

                  {/* Leave College */}
                  {trip.leaveCollegeTime && (
                    <div className="flex items-center gap-2">
                      {getTransportIcon(trip.transportMode)}
                      <div>
                        <p className="text-sm text-muted-foreground">Leaving College</p>
                        <p className="font-medium">{trip.leaveCollegeTime}</p>
                        <p className="text-sm capitalize">{trip.transportMode}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Group Info */}
                {trip.openToGroupMatching && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{trip.openSeats} open seat{trip.openSeats > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Max group:</span>
                        <span>{trip.maxGroupSize} people</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {trip.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">{trip.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
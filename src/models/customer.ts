import { Cordinate } from "../types";

class Customer {
  id = "";
  private lat = 0;
  private long = 0;
  distance = 0;

  constructor(id: string, lat: number, long: number) {
    this.id = id;
    this.lat = lat;
    this.long = long;
  }

  isInvited() {
    return this.distance <= 100;
  }

  calculateDistance(fintechCordinate: Cordinate) {
    /*
    Calculate distance between two cordinates on earth in kilometer
  */

    // converts latitudes and longitudes from degree to radian
    const userLat = (this.lat * Math.PI) / 180;
    const userLong = (this.long * Math.PI) / 180;
    const fintechLat = (fintechCordinate.lat * Math.PI) / 180;
    const fintechLong = (fintechCordinate.long * Math.PI) / 180;
    console.log(this.id);

    // Haversine formular
    const dLat = userLat - fintechLat;
    const dLong = userLong - fintechLong;
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(userLat) *
        Math.cos(fintechLat) *
        Math.pow(Math.sin(dLong / 2), 2);
    const c = Math.asin(Math.sqrt(a));

    const radius = 6371; // earch's radius in kilometer
    this.distance = Math.abs(radius * c);
    return this.distance;
  }
}

export default Customer;

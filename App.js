import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Location, Permissions } from 'expo';
import Map from './src/component/MapView';
import YelpService from './src/services/yelp';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421 
};

export default class App extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  }

  componentWillMount() {
    this.getLocationAsyc();
  }

  getCoffeeShops = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const coffeeShops =  await YelpService.getCoffeeShops(userLocation);
    this.setState({ coffeeShops });
  }
  
  getLocationAsyc = async ()=> {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if ( status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
    await this.getCoffeeShops();
  } 
 
  render() {
    const { region, coffeeShops } = this.state;
    return (
     <SafeAreaView style={styles.container}>
      <Map 
        region={region}
        places={coffeeShops} />
     </SafeAreaView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

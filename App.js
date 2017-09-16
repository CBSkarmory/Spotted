import React from "react";
import { MapView, Location, Permissions } from "expo";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons as Icon } from "@expo/vector-icons";

export default class App extends React.Component {
  state = {
    locations: [
      {
        latlng: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        title: "Homeless",
        description: "this homeless person needs help",
      },
    ],
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  setLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState(prevState => {
      return {
        ...prevState,
        locations: [
          ...prevState.locations,
          {
            latlng: {
              ...location.coords,
            },
            title: "Another Homeless",
            description: "another homeless person needs help",
          },
        ],
      };
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          followsUserLocation
          region={this.state.region}
          showsUserLocation
          onRegionChange={this.onRegionChange}
        >
          {this.state.locations.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Sighting"
            onPress={() => {
              this.setLocationAsync();
            }}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
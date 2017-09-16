import React from "react";
import { Asset, AppLoading, MapView, Location, Permissions } from "expo";
import { StyleSheet, Text, View, Alert } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons as Icon } from "@expo/vector-icons";
import moment from "moment";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDkfKyr35WDut2cvtDfYUyzgWTOBcEmr0g",
  authDomain: "homiez-267cc.firebaseapp.com",
  databaseURL: "https://homiez-267cc.firebaseio.com",
  projectId: "homiez-267cc",
  storageBucket: "homiez-267cc.appspot.com",
  messagingSenderId: "652416293785"
};

firebase.initalizeApp(firebaseConfig);

export default class App extends React.Component {
  componentWillMount() {
    const setState = this.setState.bind(this);
    const forceUpdate = this.forceUpdate.bind(this);
    Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
      if (status !== "granted") {
        setState({
          errorMessage: "Permission to access location was denied"
        });
      }
      Location.getCurrentPositionAsync({}).then(location => {
        setState(prevState => {
          return {
            ...prevState,
            isReady: true,
            region: {
              ...prevState.region,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }
          };
        });
        setTimeout(forceUpdate, 500);
      });
    });
  }

  state = {
    locations: [],
    region: {
      latitude: 40,
      longitude: -100,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    },
    isReady: false
  };

  setLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
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
              ...location.coords
            },
            title: "Homeless Individual Spotted",
            timestamp: moment(),
            description: "Last Seen: " + moment().format("h:mm a, MMMM Do YYYY")
          }
        ]
      };
    });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
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
              onCalloutPress={() => {
                Alert.alert(
                  "",
                  "Do you see any homeless individuals?",
                  [
                    {
                      text: "Yes",
                      onPress: () => console.log("Updated")
                    },
                    {
                      text: "No",
                      onPress: () => console.log("Updated")
                    }
                  ],
                  { cancelable: true }
                );
              }}
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
    color: "white"
  }
});

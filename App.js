import React from "react";
import { Asset, AppLoading, MapView, Location, Permissions } from "expo";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons as Icon } from "@expo/vector-icons";

export default class App extends React.Component {
    componentWillMount() {
        this.loadingScreen();
        const setState = this.setState.bind(this);
        const forceUpdate = this.forceUpdate.bind(this);
        Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
            if (status !== "granted") {
                setState({
                    errorMessage: "Permission to access location was denied"
                });
            } else if (!this.state.isReady) {
                return <AppLoading />;
            }
            Location.getCurrentPositionAsync({}).then(location => {
                setState(prevState => {
                    return {
                        ...prevState,
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
                        title: "Homeless Individual Spotted"
                    }
                ]
            };
        });
    };

    async loadingScreen() {
        const images = [require("./assets/icons/dickbutt2.png")];

        for (let image of images) {
            await Asset.fromModule(image).downloadAsync();
        }

        this.setState({ isReady: true });
    }

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

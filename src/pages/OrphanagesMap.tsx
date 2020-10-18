import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages').then(res => {
      setOrphanages(res.data);
    });
  });

  const handleNavigateToOrphanageDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id });
  }

  const handleNavigateToCreateOrphanage= () => {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.5208704,
          longitude: -46.6321408,
          latitudeDelta: 0.008,
          longitudeDelta:0.008 ,
        }} 
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,  
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
          </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: 160,
  },

  calloutText: {
    color: '#0089a4',
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
  },

  footer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    bottom: 32,
    elevation: 3,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    left: 24,
    paddingLeft: 24,
    position: 'absolute',
    right: 24,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    alignItems: 'center',
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    width: 56
  },
});

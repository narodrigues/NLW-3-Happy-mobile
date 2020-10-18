import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel?: boolean;   //como é opcional, passo o ?
}

export default function Header({ title, showCancel = true }: HeaderProps) {
  const navigation = useNavigation();

  const handleGoBackToHomepage = () => {
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6b6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      { showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 44,
  },

  title: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
  },
})
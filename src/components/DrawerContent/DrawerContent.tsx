import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserConstant } from '../../utils';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const navigateTo = (page: string) => {
    props.navigation.navigate(page);
  }

  const signOut = async () => {
    await AsyncStorage.removeItem(UserConstant)
    navigateTo("Login")
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.userDescriptionContent}>
              <Title style={styles.title}>Olá</Title>
            </View>
          </View>

          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
              label="Home"
              onPress={() => navigateTo("Home")} />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Sair"
          onPress={signOut}
        />
      </Drawer.Section>
    </View>
  )
}


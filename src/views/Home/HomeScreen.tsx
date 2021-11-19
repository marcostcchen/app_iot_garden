import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, StatusBar, RefreshControl, Text, Pressable } from 'react-native';
import { Heading, Toast } from 'native-base'
import { styles } from './styles';
import { PlantCard, UserPlantCard, ModalNewPlant } from '../../components';
import { Planta, User, UsuarioPlanta } from '../../models';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyPlantsConstant, apiUrl, UserConstant, grayLight } from '../../utils';
import axios from 'axios';

interface Props {
  navigation: any,
}

export const HomeScreen: React.FC<Props> = (props: Props) => {
  const { navigation } = props;
  const [plant, setPlants] = useState<Array<Planta>>([]);
  const [userPlants, setUserPlants] = useState<Array<UsuarioPlanta>>([]);
  const [isLoadingUserPlants, setIsLoadingUserPlants] = useState(true);
  const [isLoadingPlants, setIsLoadingPlants] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisibleModalNewPlant, setIsVisibleModalNewPlant] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    getPlantUserPlants();
    getPlants();
    verifyIsPremium();
  }, [])

  const verifyIsPremium = async () => {
    const userString = await AsyncStorage.getItem(UserConstant);
    if (userString != null) {
      const user: User = JSON.parse(userString);
      setIsPremium(user.premium)
    }
  }

  const getPlants = () => {
    const path = 'plants';

    const successFunc = (res) => {
      const plant = res.data;
      setPlants(plant);
      setIsLoadingPlants(false);
      setIsRefreshing(false)
    }

    const errorFunc = (err) => {
      setIsLoadingPlants(false);
      setIsRefreshing(false)

      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar os plant!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    axios.get(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
  }

  const getPlantUserPlants = async () => {
    const userString = await AsyncStorage.getItem(UserConstant);
    if (userString == null) {
      setIsLoadingPlants(false);
      setIsRefreshing(false)
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar as suas plantas!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    const user: User = JSON.parse(userString);
    const path = `user/${user.id}/plants`;

    const successFunc = async (res) => {
      const userPlants: Array<UsuarioPlanta> = res.data;
      await AsyncStorage.setItem(MyPlantsConstant, JSON.stringify(userPlants))
      setUserPlants(userPlants);
      setIsLoadingUserPlants(false);
      setIsRefreshing(false)
    }

    const errorFunc = (err) => {
      setIsLoadingUserPlants(false);
      Toast.show({ title: "Erro!", description: "Ocorreu um erro ao listar as suas plantas!", status: "error", duration: 3000, placement: "top", })
      return;
    }

    axios.get(`${apiUrl}/${path}`)
      .then(successFunc)
      .catch(errorFunc);
  }

  const renderItem = ({ item, index }) => {
    let usuarioPlanta: UsuarioPlanta = item;

    let image = require("../../images/plant1.png")
    let imageName = "plant1.png";
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant1.png")
        imageName = "plant1.png";
        break;
      case 1:
        image = require("../../images/plant2.png")
        imageName = "plant2.png";
        break;
      case 2:
        image = require("../../images/plant3.png")
        imageName = "plant3.png";
        break;
    }

    const lastMeasure = usuarioPlanta.medicoes.reduce((max, medicao) => new Date(max.created_at) > new Date(medicao.created_at) ? max : medicao);

    return (
      <>
        {index == 0 && (
          <View style={{ marginLeft: 10 }}>
            <UserPlantCard
              key={index}
              nome={usuarioPlanta.nome}
              temperatura={lastMeasure.temperatura ?? " - "}
              ar={lastMeasure.umidade ?? " - "}
              solo={" - "}
              luminosidade={lastMeasure.luminosidade ?? " - "}
              image={image}
              onPress={() => navigation.navigate("DetalhePlanta", { usuarioPlanta, image: imageName })}
            />
          </View>
        )}
        {index != 0 && index != (userPlants.length - 1) && (
          <UserPlantCard
            key={index}
            nome={usuarioPlanta.nome}
            temperatura={lastMeasure.temperatura ?? " - "}
            ar={" - "}
            solo={lastMeasure.umidade ?? " - "}
            luminosidade={lastMeasure.luminosidade ?? " - "}
            image={image}
            onPress={() => navigation.navigate("DetalhePlanta", { usuarioPlanta, image: imageName })}
          />
        )}
      </>
    )
  };

  const renderBundles = ({ item, index }) => {
    let planta: Planta = item;

    let image = require("../../images/plant1.png")
    let imageName = "plant1.png";
    let rest = index % 3;

    switch (rest) {
      case 0:
        image = require("../../images/plant2.png")
        imageName = "plant2.png";
        break;
      case 1:
        image = require("../../images/plant3.png")
        imageName = "plant3.png";
        break;
      case 2:
        image = require("../../images/plant1.png")
        imageName = "plant1.png";
        break;
    }

    return (
      <>
        {index == 0 && (
          <View style={{ marginLeft: 10 }}>
            <PlantCard
              key={index}
              nome={planta.especie}
              tempIdeal={planta.temperatura_ideal}
              soloIdeal={planta.umidade_solo_ideal}
              arIdeal={planta.umidade_ar_ideal}
              lumIdeal={planta.luminosidade_ideal}
              image={image}
              onPress={() => navigation.navigate("PacotePlanta", { planta, image: imageName })}
            />
          </View>
        )}
        {index != 0 && (
          <PlantCard
            key={index}
            nome={planta.especie}
            tempIdeal={planta.temperatura_ideal}
            soloIdeal={planta.umidade_solo_ideal}
            arIdeal={planta.umidade_ar_ideal}
            lumIdeal={planta.luminosidade_ideal}
            image={image}
            onPress={() => navigation.navigate("PacotePlanta", { planta, image: imageName })}
          />
        )}
      </>
    )
  };

  const refreshInfo = () => {
    setIsRefreshing(true);
    getPlants();
    getPlantUserPlants()
  }

  const setPremium = () => {
    setIsPremium(true);
  }

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshInfo}
          />
        }
      >
        <StatusBar translucent barStyle="dark-content" backgroundColor={'transparent'} />
        <View style={{ width: '100%', marginTop: 20 }}>
          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Minhas Plantas</Heading>

            {isLoadingUserPlants && (
              <View style={{ height: 300, justifyContent: 'center', }}>
                <SkeletonPlaceholder highlightColor="rgba(4, 255, 4, 0.108)">
                  <SkeletonPlaceholder.Item flexDirection="row" >
                    <SkeletonPlaceholder.Item width={200} marginLeft={20} height={300} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={200} marginLeft={10} height={300} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={200} marginLeft={10} height={300} borderRadius={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}

            {!isLoadingUserPlants && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={userPlants}
                renderItem={renderItem}
              />
            )}
          </View>

          <View style={styles.menuContainer}>
            <Heading style={styles.title}>Pacotes</Heading>

            {isLoadingPlants && (
              <View style={{ height: 300, justifyContent: 'center', marginTop: 10 }}>
                <SkeletonPlaceholder highlightColor="rgba(4, 255, 4, 0.108)">
                  <SkeletonPlaceholder.Item flexDirection="row" >
                    <SkeletonPlaceholder.Item width={200} marginLeft={20} height={300} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={200} marginLeft={10} height={300} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={200} marginLeft={10} height={300} borderRadius={10} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            )}

            {!isLoadingPlants && (
              <View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={plant}
                  renderItem={renderBundles}
                />

                {!isPremium && (
                  <>
                    <View style={styles.bePremiumOpacityContainer}></View>
                    <View style={styles.bePremiumContainer}>
                      <Text style={styles.bePremiumText}>Seja Premium e receba diversas dicas e recomendações para cuidar da sua planta!</Text>
                      <Pressable
                        style={styles.bePremiumButton}
                        onPress={setPremium}
                        android_ripple={{ color: grayLight, radius: 70 }}
                      >
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Assinar Premium</Text>
                      </Pressable >
                    </View>
                  </>
                )}
              </View>
            )}
          </View>

          <View style={{ height: 50 }} />
        </View>

        <ModalNewPlant
          isVisibleModal={isVisibleModalNewPlant}
          setIsVisibleModal={setIsVisibleModalNewPlant}
        />

      </ScrollView>
    </>
  )
}

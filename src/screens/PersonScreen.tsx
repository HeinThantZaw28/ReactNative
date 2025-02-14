/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {ChevronLeftIcon, HeartIcon} from 'react-native-heroicons/solid';
import UpcomingMovies from './UpcomingMovies';
import Loading from '../components/Loading';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CastApiInfo,
  PersonDetailApiInfo,
  TrendingMovieApiInfo,
} from '../api/type';
import {
  fallbackPersonImage,
  fetchImage342,
  fetchPersonDetail,
  fetchPersonMovies,
} from '../api/moviedb';

interface PersonProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{params: {cast: CastApiInfo}}, 'params'>;
}

const PersonScreen = ({navigation, route}: PersonProps) => {
  const {cast} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState<PersonDetailApiInfo>();
  const [relatedMovies, setRelatedMovies] = useState<TrendingMovieApiInfo[]>();

  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, [cast]);

  const getPersonDetails = async () => {
    setIsLoading(true);
    const data: PersonDetailApiInfo = await fetchPersonDetail(cast.id);
    data && setPersonDetails(data);
    setIsLoading(false);
  };

  const getPersonMovies = async () => {
    const data = await fetchPersonMovies(cast.id);
    data?.cast && setRelatedMovies(data.cast);
  };

  //react hook
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeftIcon}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? 'orange' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri:
                  fetchImage342(personDetails?.profile_path as string) ||
                  fallbackPersonImage,
              }}
              resizeMode="cover"
              style={styles.img}
            />
            <Text style={[styles.profileText, styles.commonWhiteText]}>
              {personDetails?.name}
            </Text>
            <Text style={[styles.profileAddress, styles.commonGrayText]}>
              {personDetails?.place_of_birth}
            </Text>
          </View>
          <View style={styles.actorBio}>
            <View style={styles.detail}>
              <Text style={[styles.bioHeaderText, styles.commonWhiteText]}>
                Gender
              </Text>
              <Text style={[styles.bioText, styles.commonGrayText]}>
                {personDetails?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View style={{borderColor: 'lightgray', borderWidth: 1}} />
            <View style={styles.detail}>
              <Text style={[styles.bioHeaderText, styles.commonWhiteText]}>
                Birthday
              </Text>
              <Text style={[styles.bioText, styles.commonGrayText]}>
                {personDetails?.birthday}
              </Text>
            </View>
            <View style={{borderColor: 'lightgray', borderWidth: 1}} />
            <View style={styles.detail}>
              <Text style={[styles.bioHeaderText, styles.commonWhiteText]}>
                Known for
              </Text>
              <Text style={[styles.bioText, styles.commonGrayText]}>
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View style={{borderColor: 'lightgray', borderWidth: 1}} />
            <View style={styles.detail}>
              <Text style={[styles.bioHeaderText, styles.commonWhiteText]}>
                Popularity
              </Text>
              <Text style={[styles.bioText, styles.commonGrayText]}>
                {personDetails?.popularity}
              </Text>
            </View>
          </View>
          {/**biography */}
          <View style={styles.biography}>
            <Text style={[styles.commonWhiteText, {fontSize: 20}]}>
              Biography
            </Text>
            <Text
              style={[styles.bioText, styles.commonGrayText, {lineHeight: 15}]}>
              {personDetails?.biography}
            </Text>
          </View>
          <UpcomingMovies
            title={'Related Movies'}
            hideSeeAll={false}
            data={relatedMovies}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  headerLeftIcon: {
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 5,
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 500,
    // elevation: 10,
  },
  commonWhiteText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: '600',
  },
  commonGrayText: {
    fontFamily: 'Roboto',
    color: 'lightgray',
  },
  profileText: {
    fontSize: 30,
  },
  profileAddress: {
    fontSize: 15,
  },
  actorBio: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#2E2E2E',
    borderRadius: 20,
    gap: 20,
    marginVertical: 20,
  },
  detail: {
    alignItems: 'center',
  },
  bioHeaderText: {
    fontSize: 15,
  },
  bioText: {
    fontSize: 12,
  },
  biography: {
    gap: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

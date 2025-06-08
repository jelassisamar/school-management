import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchParentWithChildren } from '../../redux/actions/parent.actions';
import { logoutUser } from '../../redux/actions/auth.actions';

const Eleves = ({navigation}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { parentData, loading, error } = useSelector((state) => state.parent);
  
  const [fadeAnim] = useState(new Animated.Value(1)); 
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (user?._id) {
    
      dispatch(fetchParentWithChildren(user._id));
        console.log("user",user._id)
    } 
  }, [dispatch, user?._id]);

const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  if (logoutUser.fulfilled.match(result)) {
    console.log("logout")
    navigation.navigate('Login');
   }
};

const [loading1, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  if (loading1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A6FA5" />
        <Text style={styles.loadingText}>Chargement des élèves...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.loadingText, { color: 'red' }]}>{error}</Text>
      </View>
    );
  }

  return (
    <Animated.View 
      style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.userProfileContainer}>
          <View style={styles.userImageContainer}>
            <Image source={require('../../../assets/images/user.png')} style={styles.userImage} />
            <View style={styles.userStatusIndicator} />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user?.nom} {user?.prenom}</Text>
            <Text style={styles.userRole}>Compte Parent</Text>
          </View>
          <Icon name="notifications" size={24} color="#4A6FA5" style={styles.notificationIcon} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="school" size={24} color="#4A6FA5" />
            <Text style={styles.sectionTitle}>Sélectionner un élève</Text>
          </View>

          <View style={styles.studentList}>
            {parentData?.enfants?.length > 0 ? (
              parentData.enfants.map((eleve) => (
                <TouchableOpacity
                  key={eleve._id}
                  style={styles.studentCard}
                  activeOpacity={0.7}
                  onPress={() => {
  navigation.navigate('MenuPrincipalParent', { eleveId: eleve._id });
}}

                >
                  <View style={styles.studentInitialsContainer}>
                    <Text style={styles.studentInitials}>
                      {eleve.prenom?.charAt(0)}{eleve.nom?.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{eleve.prenom} {eleve.nom}</Text>
                    <Text style={styles.studentClass}>{eleve.classe?.nom}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noStudentsText}>Aucun élève trouvé</Text>
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText} onPress={handleLogout}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { 

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'System',
    fontWeight: '500',
  },
  container: {

    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 90,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  userImageContainer: {
    position: 'relative',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  userStatusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  userRole: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  notificationIcon: {
    padding: 8,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  studentList: {
    marginTop: 8,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  studentInitialsContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A6FA5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentInitials: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  studentClass: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  noStudentsText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#4A6FA5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Eleves;
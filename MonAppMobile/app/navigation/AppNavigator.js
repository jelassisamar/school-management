import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/auth/SplashScreen";
import Login from "../screens/auth/Login"; // À créer
import MenuPrincipal from "../screens/eleve/MenuPrincipal";
import Eleves from "../screens/parent/Eleves";
import MenuPrincipalParent from "../screens/parent/MenuPrincipalParent";
import Emploi from "../screens/eleve/Emploi";
import Resultats from "../screens/eleve/Resultats";
import EmploiParent from "../screens/parent/EmploiParent";
import Absence from "../screens/eleve/Absence";
import Contact from "../screens/eleve/Contact";
import Messages from "../screens/eleve/Messages";
import UnMessage from "../screens/eleve/UnMessage";

import AbsenceParent from "../screens/parent/AbsenceParent";
import ResultatsParent from "../screens/parent/ResultatsParent";
import MessagesParent from "../screens/parent/MessagesParent";
import UnMessageParent from "../screens/parent/UnMessageParent";
import ContactParent from "../screens/parent/ContactParent";
import Rendez_vous from "../screens/parent/Rendez_vous";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
      <Stack.Screen name="Eleves" component={Eleves} />
      <Stack.Screen name="Emploi" component={Emploi} />
      <Stack.Screen name="Resultats" component={Resultats} />
      <Stack.Screen name="Absence" component={Absence} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="UnMessage" component={UnMessage} />
      <Stack.Screen name="Contact" component={Contact} />

      <Stack.Screen name="EmploiParent" component={EmploiParent} />
      <Stack.Screen name="AbsenceParent" component={AbsenceParent} />
      <Stack.Screen name="ResultatsParent" component={ResultatsParent} />
      <Stack.Screen name="MessagesParent" component={MessagesParent} />
      <Stack.Screen name="UnMessageParent" component={UnMessageParent} />
      <Stack.Screen name="ContactParent" component={ContactParent} />
      <Stack.Screen name="Rendez_vous" component={Rendez_vous} />
      <Stack.Screen
        name="MenuPrincipalParent"
        component={MenuPrincipalParent}
      />
    </Stack.Navigator>
  );
}

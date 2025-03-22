import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getUser} from "./Api";

const HomeScreen = ({ navigation }: any) => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        navigation.replace("Login");
    };


    const [Users, setUser] = useState<any[]>([])

    useEffect(() => {
        getUser().then(setUser);
    }, []);

    return(

        <View style={{padding:20 }}>

            <Text> User Listing</Text>

            <FlatList
            data={Users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.fullname}</Text>
                    {/* <Button tittle="View" onPress={() => navigation.navigate('UserDetail', {id: item.id})} />
                    <Button tittle="Edit" onPress={() => navigation.navigate('EditUser', {id: item.id})} />
                     <Button tittle="Delete" onPress={() => navigation.navigate('DeleteUser', {id: item.id})} /> */}
                     </View>
    )}
    />

    <Button  title="Logout" onPress={handleLogout}/>

    </View>
    );
};

export default HomeScreen
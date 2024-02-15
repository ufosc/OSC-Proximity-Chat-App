import React, { useState } from 'react';
import {SafeAreaView,
    Text,
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Switch,
    TouchableOpacity,
    Image,

} from 'react-native';

import angleRight from '../../../assets/angle-right.png';


// List of settings items
const Sections = [
    {
        header: 'Notications',
        items: [
            {id: 'notifiyNewMessage', title: 'Notifications for new messages', type: 'toggle'},
        ]
    },
    {
        header: 'Preferences',
        items: [
            {id: 'darkMode', title: 'Dark Mode', type: 'toggle'},
            {id: 'language', title: 'Language', type: 'select'},
        ]
    },
    {
        header: 'Privacy',
        items: [
            {id: 'messageDeletionDelay', title: 'Message deletion delay', type: 'slider'},
        ]
    },

]

// props to pass into settings
type SettingsProps = {
    id: string,
    title: string,
    type: string,
}



const SettingsScreen : React.FC = () => {

    // settings values (will be changed later to reflect the actual settings)
    const [data, setData] = useState({
        notifyNewMessage: true,
        darkMode: false,
        language: 'English',
        messageDeletionDelay: 30,
        
    });

    const SettingsItem = ({id, title, type}: SettingsProps) => (
        
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.row}>
                <Text style={styles.rowTitle}>{title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {type === 'toggle' && (
                        <Switch
                            onValueChange={(val) => { setData({ ...data, [id]: Boolean(val) }); }} // Convert val to boolean using Boolean() function
                            value={Boolean(data[id as keyof typeof data])} // Convert data[id] to boolean using Boolean() function
                        />
                    )}
                    
                    {type === 'select' && (
                        <Text style={styles.rowValueText}>{data[id as keyof typeof data]}</Text>
                    )}

                    {(type === 'select' || type === 'link') && (
                        
                        <Image source={angleRight} style={{height: 20, width: 20}} />
                        
                    )}
                </View>
            </View>
        </TouchableOpacity>
        
    )
                            
    return (
            <SafeAreaView style={{ backgroundColor: '#f6f6f6' }}>
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Settings</Text>
                    </View>

                    {Sections.map(({header, items}) => (
                        <View style={styles.section} key={header}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>{header}</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {items.map(({id, title, type}) => (
                                    <View key = {id} style={styles.rowWrapper}>
                                        <SettingsItem id={id} title={title} type={type} />
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    // Styles
    container: {
        paddingVertical: 24,
    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 12,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    section: {
        paddingTop: 12,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionContent: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    
    // Row styles
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 24,
        height: 50,
        
    },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowTitle: {
        fontSize: 17,
        color: '#616161',
        marginRight: 4,
    },
    rowValueText: {
        marginRight: 5,
        color: '#616161',
        fontSize: 16,
    },
});

export default SettingsScreen; // Good for standalone components/Screens
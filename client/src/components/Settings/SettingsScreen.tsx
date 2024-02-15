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
    Dimensions,

} from 'react-native';


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
            {id: 'deleteMessages', title: 'Delete messages', type: 'toggle'},
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
        deleteMessages: false,
        
    });

    // The component for a row that contains a single setting
    const SettingsRow = ({id, title, type}: SettingsProps) => (
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
                        
                        <Image source={require('../../../assets/angle-right.png')} style={styles.rightArrow} />
                        
                    )}
                </View>
            </View>
        </TouchableOpacity>
        
    )
                            
    return (
            <SafeAreaView style={styles.safeAreaStyle}>
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
                                        <SettingsRow id={id} title={title} type={type} />
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
    safeAreaStyle: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    container: {
        paddingVertical: 24,
    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
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
        paddingRight: 22,
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
    rightArrow: {
        height: Dimensions.get('window').height * 0.024,
        width: Dimensions.get('window').height * 0.024,
    },
});

export default SettingsScreen;
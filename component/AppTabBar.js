import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabBar, SearchBar } from 'antd-mobile-rn';

export default class AppTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'greenTab',
        };
    }

    renderContent(pageText) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </View>
        );
    }

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        // return (
        //     <TabBar unselectedTintColor="#7A7A7A" tintColor="#004EA2" barTintColor="white" style={{
        //         borderBottomColor: '#e0e0e0',
        //         borderBottomWidth: StyleSheet.hairlineWidth
        //     }}>
        //     <TabBar.Item title="消息" 
        //         icon={require("../resource/images/icon-chat.png")} 
        //         selectedIcon={require("../resource/images/icon-chat-selected.png")} 
        //         selected={this.state.selectedTab === "blueTab"} 
        //         onPress={() => this.onChangeTab("blueTab")}>
        //         <ChatScreen />
        //     </TabBar.Item>
        //     <TabBar.Item 
        //         icon={require("../resource/images/icon-book.png")}
        //         selectedIcon={require("../resource/images/icon-book-selected.png")}
        //         title="通讯录" 
        //         badge={2} 
        //         selected={this.state.selectedTab === "redTab"} 
        //         onPress={() => this.onChangeTab("redTab")}>
        //       <BookPage />
        //     </TabBar.Item>
        //     <TabBar.Item 
        //         icon={require("../resource/images/icon-mapp.png")}
        //         selectedIcon={require("../resource/images/icon-mapp-selected.png")}
        //         title="应用" 
        //         selected={this.state.selectedTab === "greenTab"} 
        //         onPress={() => this.onChangeTab("greenTab")}>
        //         <AppPage/>
        //     </TabBar.Item>
        //     <TabBar.Item 
        //         icon={require("../resource/images/icon-user.png")}
        //         selectedIcon={require("../resource/images/icon-user-selected.png")}
        //         title="我" 
        //         selected={this.state.selectedTab === "yellowTab"} 
        //         onPress={() => this.onChangeTab("yellowTab")}>
        //         <MyPage />
        //     </TabBar.Item>
        // </TabBar>);
    }
}
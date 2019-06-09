import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Thumbnail
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/account-bg.jpg");
const drawerImage = require("../../../assets/account.jpg");


class SideBar extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };

    this.datas = [
      {
        name: "Master Mode",
        route: "Mastermode",
        iconimage: require("./assets/Menu/menu_master_w.png"),
        icon: "people",
        bg: "#C5F442"
      },
      {
        name: "Connection",
        route: this.props.screenProps.mode==1?"Master1":"Master1",
        iconimage: require("./assets/Menu/connect_w.png"),
        icon: "people",
        bg: "#666666",

      },
      {
        name: "Recorder Mode",
        route: "Recordermode2",
        iconimage: require("./assets/Menu/menu_recorder_w.png"),
        icon: "people",
        bg: "#666666",

      },
      {
        name: "Play",
        route: "PlayMode",
        iconimage: require("./assets/Menu/menu_play_w.png"),
        icon: "people",
        bg: "#666666",

      }

    ];
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#212121", top: -1 }}

        >


          <ImageBackground source={require('../../../assets/account-bg.jpg')} style={{width: undefined,height: 200,justifyContent: 'center',alignItems:'center'}}>
                <Thumbnail large source={require('../../../assets/minj.jpg')} />
          </ImageBackground>
          <List style={{backgroundColor: "#666666" }}
            dataArray={this.datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                <Image style={{width:30, height:30}} source={data.iconimage} />

                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;

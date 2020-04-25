import React, {Component} from "react";
import {Image, LayoutAnimation, Platform, SafeAreaView, UIManager, View} from "react-native";
import {DragContainer, Draggable, DropZone} from "react-native-drag-drop-and-swap";
import FOODS_QUERY from "../quiries/foods";
import BubbleText from "../components/BubbleText";
import URLs from "../constants/URLs";
import {Header} from "../components/Header";
import AwesomeAlert from "react-native-awesome-alerts";
import {withApollo} from 'react-apollo';
import Colors from "../constants/Colors";

class DeleteZone extends React.Component {
    componentWillReceiveProps({dragOver}) {
        if (
            Platform.OS === "android" &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {
        return (
            <View
                style={{
                    // top: this.props.dragOver ? 0 : -100,
                    height: 200,
                    backgroundColor: "#eee",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <View>
                    <Image source={require("../assets/images/mark.png")} style={{height: 140, width: 140}}
                           resizeMode="contain"/>
                </View>
            </View>
        );
    }
}

class DraggyInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [
                "blue",
                "blueviolet",
                "brown",
                "chocolate",
                "coral",
                "cornflowerblue",
                "darkcyan",
                "darkgoldenrod",
                "darkgreen",
                "darkkhaki",
                "darkmagenta",
                "darkolivegreen",
                "darkorange",
                "darkorchid",
                "darkred",
                "darksalmon",
                "darkseagreen",
                "darkslateblue",
                "darkslategrey",
                "darkturquoise",
                "darkviolet",
                "deeppink",
                "deepskyblue",
                "dimgray",
                "dimgrey",
                "dodgerblue",
                "firebrick",
                "floralwhite",
                "forestgreen",
                "fuchsia",
                "gainsboro",
                "ghostwhite",
                "gold",
                "goldenrod",
                "gray",
                "green",
                "greenyellow",
                "grey",
                "honeydew",
                "hotpink",
                "indianred",
                "indigo",
                "ivory",
                "khaki",
                "magenta",
                "maroon",
                "mediumaquamarine",
                "mediumblue",
                "mediumorchid",
                "mediumpurple",
                "mediumseagreen",
                "mediumslateblue",
                "mediumspringgreen",
                "mediumturquoise",
                "mediumvioletred",
                "midnightblue",
                "mintcream",
                "mistyrose",
                "moccasin",
                "navajowhite",
                "navy",
                "oldlace",
                "olive",
                "olivedrab",
                "orange",
                "orangered",
                "orchid",
                "palegoldenrod",
                "palegreen",
                "paleturquoise",
                "palevioletred",
                "papayawhip",
                "peachpuff",
                "peru",
                "pink",
                "plum",
                "powderblue",
                "purple",
                "rebeccapurple",
                "red",
                "rosybrown",
                "royalblue",
                "saddlebrown",
                "salmon",
                "sandybrown",
                "seagreen",
                "seashell",
                "sienna",
                "silver",
                "skyblue",
                "slateblue",
                "slategray",
                "snow",
                "springgreen",
                "steelblue",
                "tan",
                "teal",
                "thistle",
                "tomato",
                "turquoise",
                "violet",
                "wheat",
                "white",
                "whitesmoke",
                "yellow",
                "yellowgreen"
            ]
        };
    }

    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            if (
                Platform.OS === "android" &&
                UIManager.setLayoutAnimationEnabledExperimental
            ) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
            LayoutAnimation.easeInEaseOut();
            return (
                //

                <View
                    style={{
                        width: this.props.dragOver ? 110 : 100,
                        alignItems: "center",
                        justifyContent: "center",
                        height: this.props.dragOver ? 110 : 100,
                        backgroundColor: "rgba(255,0,0,.7)"
                    }}
                >
                    <Image source={{uri: URLs.API_URL + this.props.food.Image.url}} style={{width: 50, height: 50}}
                           resizeMode="contain"/>

                </View>
            );
        }
        let shadows = {
            shadowColor: "black",
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: 0.5,
            shadowRadius: 20,
            opacity: 0.5
        };
        return (
            <View
                style={[
                    {
                        height: 100,
                        width: 100,
                        backgroundColor: this.props.ghost
                            ? this.state.color[this.props.index]
                            : this.state.color[this.props.index + 4],
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    this.props.dragging ? shadows : null
                ]}
            >
                <Image source={{uri: URLs.API_URL + this.props.food.Image.url}} style={{width: 50, height: 50}}
                       resizeMode="contain"/>

            </View>
        );
    }
}

class Draggy extends React.Component {
    render() {
        return (
            <Draggable data={this.props.food.id} style={{margin: 7.5}} dragOn="onPressIn">
                <DropZone
                    disabled
                    onDrop={e => this.props.onDrop(e, this.props.index)}
                    onEnter={e =>
                        this.props.onHover(this.props.food, this.props.index)
                    }
                >
                    <DraggyInner
                        food={this.props.food}
                        index={this.props.index}
                    />
                </DropZone>
            </Draggable>
        );
    }
}

let alphaData = [];
let first = "A",
    last = "L";
for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
    alphaData.push({data: eval("String.fromCharCode(" + i + ")"), id: i});
}

class HealthyFoodGame extends Component {
    constructor(props) {
        super(props);
        this.displayName = "DragDropTest";
        this.onDrop = this.onDrop.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.returnToHome = this.returnToHome.bind(this);
        this.state = {
            foods: [],
            hoverData: {},
            dropData: {},
            hoverDataIndex: null,
            showAlert: false,
            showSuccess: false,
        };


    }

    componentDidMount() {
        this.fetchData(this.props);
    }

    async fetchData(props) {
        const {client} = props;
        const result = await client.query({
            query: FOODS_QUERY, /* other options, e.g. variables: {} */
        });


        this.setState({
            foods: result.data.foods,
            loading: false,
        });
    }

    onDrop(data, index) {
        let foods = this.state.foods.map((item, i) => {
            if (item.id == data.id) {
                return this.state.hoverData;
            }
            if (item.id == this.state.hoverData.id) {
                return data;
            }
            return item;
        });
        this.setState({foods});
    }

    onDelete(e) {
        let data = this.state.foods || [];
        let Item = data.find((item) => item.id == e);
        if (Item.Type == 'Healthy') {
            let foods = data.filter(function (item) {
                return item.id != e;
            });
            this.setState({foods});
        } else {
            this.showAlert();
        }
        if (data.filter((item) => item.Type == 'Healthy').length <= 1) {
            this.showSuccess();
        }

    }

    onHover(hoverData, hoverDataIndex) {
        this.setState({hoverData, hoverDataIndex});
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };
    showSuccess = () => {
        this.setState({
            showSuccess: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };
    returnToHome = () => {
        this.props.navigation.navigate('Home Page')
    };

    render() {
        const {showAlert, showSuccess} = this.state;

        return (
            <DragContainer>


                <SafeAreaView style={{flex: 1, marginTop: 60}}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Think Again!"
                        message="This doesn't seem like a healthy food"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Try Again"
                        alertContainerStyle={{
                            zIndex: 100
                        }}
                        confirmButtonColor={Colors.purple}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                    <AwesomeAlert
                        show={showSuccess}
                        showProgress={false}
                        title="Great work!"
                        message="Mark can now enjoy his healthy food"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Return to Home"
                        alertContainerStyle={{
                            zIndex: 100
                        }}
                        confirmButtonColor={Colors.purple}
                        onConfirmPressed={() => {
                            this.returnToHome();
                        }}
                    />
                    <Header showBack={true} navigation={this.props.navigation}/>
                    <View style={{flex: 0.3}}>
                        <DropZone
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                flex: 1,
                                backgroundColor: "#eee",

                            }}
                            onDrop={e => this.onDelete(e)}
                        >
                            <DeleteZone/>
                        </DropZone>
                    </View>
                    <BubbleText style={{fontSize: 20, fontWeight: "bold", alignSelf: "center", color: "#f900f9"}}>
                        Help Mark to eat healthy food
                    </BubbleText>

                    <View style={{flex: 0.7, justifyContent: "center"}}>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "flex-end",
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >

                            {this.state.foods.sort(function () {
                                return .5 - Math.random();
                            }).map(
                                (food, i) => {
                                    return (
                                        <Draggy
                                            key={i}
                                            food={food}
                                            onHover={this.onHover}
                                            onDrop={this.onDrop}
                                            index={i}
                                        />
                                    )
                                }
                            )
                            }

                        </View>
                    </View>
                </SafeAreaView>
            </DragContainer>
        );
    }
}

export default withApollo(HealthyFoodGame);

//AppRegistry.registerComponent("UCLFantasy", () => App);
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import io from 'socket.io-client';

import api from '../services/api'

import camera from '../assets/camera.png'
import more from '../assets/more.png'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import send from '../assets/send.png'

export default class Feed extends Component {
    socket = io('http://localhost:3333')

    state = {
        feed: [],
    };

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
                <Image source={camera} />
            </TouchableOpacity>
        )
    })

    async componentDidMount() {
        const response = await api.get('posts');

        this.setState({ feed: response.data });
        this.registerToSocket()
    }

    handlerLike = async id => {
        await api.post(`/posts/${id}/like`)
    }

    registerToSocket = () => {
        this.socket.on('post_created', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        })

        this.socket.on('post_liked', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => {
                    return post._id === likedPost._id ? likedPost : post
                })
            })
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.feed}
                keyExtractor={post => post._id}
                renderItem={({ item }) => (
                    <View style={styles.feedItem}>

                        <View style={styles.feedItemHeader}>
                            <View style={styles.userInfo}>
                                <Text style={styles.name}>{item.author}</Text>
                                <Text style={styles.place}>{item.place}</Text>
                            </View>

                            <Image source={more} />
                        </View>

                        <Image style={styles.feedImagem} source={{ uri: `http://localhost:3333/files/${item.image}` }} />

                        <View style={styles.feedItemFooter}>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.action} onPress={() => { this.handlerLike(item._id) }}>
                                    <Image source={like} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action} onPress={() => { }}>
                                    <Image source={comment} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.action} onPress={() => { }}>
                                    <Image source={send} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.likes}>{item.likes} curtidas</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.hashtags}>{item.hashtags}</Text>
                        </View>

                    </View>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    feedItem: {
        marginTop: 20,
    },
    feedItemHeader: {
        paddingHorizontal: 15,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfo: {
    },
    name: {
        fontSize: 14,
        color: '#000',
        marginTop: 2
    },
    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },
    feedImagem: {
        width: '100%',
        height: 400,
        marginVertical: 15
    },
    feedItemFooter: {
        paddingHorizontal: 15,
    },
    actions: {
        flexDirection: 'row',
    },
    action: {
        marginRight: 8
    },
    likes: {
        marginTop: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    description: {
        lineHeight: 18,
        color: '#000'
    },
    hashtags: {
        color: '#7159c1'
    }
})
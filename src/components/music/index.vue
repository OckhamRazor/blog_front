<template>
  <md-whiteframe md-tag="section" md-elevation="2" class="container">
    <div class="music-play-tool">
      <div class="album-cover" @click="togglePlay">
        <img :src="currentMusic.cover" alt="music-cover"/>
        <icon-svg iconClass="pause" class="pause-icon" v-show="playing"></icon-svg>
        <icon-svg iconClass="play-copy" class="play-icon" v-show="!playing"></icon-svg>
      </div>
      <div class="info">
        <p class="name">{{currentMusic.name}}</p>
        <p class="author">{{currentMusic.author}}</p>
      </div>
      <div class="list-icon-wrapper md-dense" @click="showPlayList">
        <icon-svg iconClass="musiclist" class="list-icon"></icon-svg>
      </div>
      <audio v-on:loadeddata="play" ref="audioPlayer" preload="meta"></audio>
    </div>
    <slide-up-down :active="displayList" :duration="300">
      <md-list class="music-play-list md-dense">
        <md-list-item @click="change(item)" class="music-play-item" v-for="(item, index) in playList" :key="'music-item-' + index">
          <music-item :index="index" :item="item"></music-item>
        </md-list-item>
      </md-list>
    </slide-up-down>
  </md-whiteframe>
</template>

<script>
import SlideUpDown from '@/components/slideUpDown'
import MusicItem from '@/components/music/musicItem'

export default {
  name: 'Music',

  components: {
    SlideUpDown,
    MusicItem
  },

  data () {
    return {
      dirty: false,
      playing: false,
      displayList: false,
      currentMusic: {cover: '/static/images/music-1.jpg', name: '莉莉安', author: '宋冬野', duration: '5:23', src: '/static/music/test.mp3'},
      playList: [
        {cover: '/static/images/music-1.jpg', name: '莉莉安', author: '宋冬野', duration: '5:23', src: '/static/music/test.mp3'},
        {cover: '/static/images/music-2.jpg', name: '别想她', author: '高进', duration: '3:49', src: '/static/music/test2.mp3'},
        {cover: '/static/images/music-3.jpg', name: '小酒窝', author: '林俊杰', duration: '3:38', src: '/static/music/test3.mp3'}
      ]
    }
  },

  methods: {
    togglePlay () {
      if (this.$refs.audioPlayer.paused) {
        this.play()
      } else {
        this.pause()
      }
    },
    pause () {
      this.$refs.audioPlayer.pause()
      this.playing = false
    },
    play () {
      if (!this.dirty) {
        this.dirty = true
        this.$refs.audioPlayer.src = this.currentMusic.src
        return
      }
      this.$refs.audioPlayer.play()
      this.playing = true
    },
    showPlayList () {
      this.displayList = !this.displayList
    },

    change (item) {
      if (!item.src) return
      this.pause()
      this.$refs.audioPlayer.src = item.src
      this.currentMusic = item
    }
  }

}
</script>
<style lang="scss" scoped>
  @import './index.scss'
</style>

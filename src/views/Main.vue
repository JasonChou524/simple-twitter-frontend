<template>
  <div class="main-container">
    <div class="row">
      <nav-tabs class="col-3" />
      <div class="main col-6">
        <div class="title">
          <h4>首頁</h4>
        </div>
        <tweet-create-card
          :currentUser="currentUser"
          :tweets="tweets"
          @afterCreateTweet="afterCreateTweet"
        />
        <tweet-card
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          @afterAddLike="afterAddLike"
          @afterRemoveLike="afterRemoveLike"
        />
      </div>
      <user-popular class="col-3" />
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserPopular from '../components/UserPopular.vue'
import TweetCard from '../components/TweetCard.vue'
import TweetCreateCard from '../components/TweetCreateCard.vue'

const dummyTweets = [
  {
    id: 36,
    UserId: 5,
    description: 'quam sunt maiores',
    createdAt: '2022-08-05T06:38:34.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 113
      },
      {
        id: 112
      },
      {
        id: 111
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 28,
    UserId: 4,
    description:
      'Non veniam perferendis numquam animi accusamus. Et sint quia quo. Voluptates dolores laudantium dolores.',
    createdAt: '2022-08-05T06:31:57.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 89
      },
      {
        id: 88
      },
      {
        id: 87
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 3,
    UserId: 2,
    description:
      'Delectus error sed nulla vero voluptatem. Quia temporibus rerum exercitationem et. Aut repellendus iusto error sapiente dolores au',
    createdAt: '2022-08-05T06:13:56.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 14
      },
      {
        id: 13
      },
      {
        id: 12
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 4,
    UserId: 2,
    description:
      'Aliquam qui omnis dolorum veniam maiores aliquid repudiandae iure quia. Est nam accusamus consequatur. Aut ut tenetur et quam. Ad ',
    createdAt: '2022-08-05T06:05:08.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 17
      },
      {
        id: 16
      },
      {
        id: 15
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 11,
    UserId: 3,
    description:
      'Atque aperiam assumenda. Et qui quas enim eum. Magni autem dolor tempore ut id aspernatur dolorum. Magni voluptas et dolorem.',
    createdAt: '2022-08-05T05:43:29.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 38
      },
      {
        id: 37
      },
      {
        id: 36
      }
    ],
    Likes: [
      {
        id: 3,
        UserId: 2,
        TweetId: 11,
        createdAt: '2022-08-07T14:44:00.000Z',
        updatedAt: '2022-08-07T14:44:00.000Z'
      }
    ],
    replyCount: 3,
    likeCount: 1,
    isLiked: true
  },
  {
    id: 12,
    UserId: 3,
    description:
      'Dolore ab necessitatibus fugiat cumque. Nulla laborum rem impedit voluptatibus ducimus. Dolores eum non nam nostrum dolores et omn',
    createdAt: '2022-08-05T04:13:13.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 41
      },
      {
        id: 40
      },
      {
        id: 39
      },
      {
        id: 3
      }
    ],
    Likes: [
      {
        id: 4,
        UserId: 2,
        TweetId: 12,
        createdAt: '2022-08-07T14:44:04.000Z',
        updatedAt: '2022-08-07T14:44:04.000Z'
      }
    ],
    replyCount: 4,
    likeCount: 1,
    isLiked: true
  },
  {
    id: 40,
    UserId: 5,
    description: 'provident',
    createdAt: '2022-08-05T03:53:57.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 125
      },
      {
        id: 124
      },
      {
        id: 123
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 42,
    UserId: 6,
    description: 'sed',
    createdAt: '2022-08-05T02:05:51.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 131
      },
      {
        id: 130
      },
      {
        id: 129
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 7,
    UserId: 2,
    description:
      'Sint ad dolorum eaque sapiente dolore blanditiis. Sunt ratione voluptas minima quidem. Magnam et laborum eum autem et nam. Necessi',
    createdAt: '2022-08-05T01:39:14.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 26
      },
      {
        id: 25
      },
      {
        id: 24
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 9,
    UserId: 2,
    description:
      'Delectus ullam et provident id unde ut ducimus pariatur aspernatur. Deserunt qui officiis omnis ut quidem nisi qui ex delectus. Vo',
    createdAt: '2022-08-05T00:23:05.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 32
      },
      {
        id: 31
      },
      {
        id: 30
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 27,
    UserId: 4,
    description:
      'Culpa voluptate sit ex. Sed similique quia nulla nihil iusto. Suscipit fugit modi vel est est eaque praesentium. Distinctio quo op',
    createdAt: '2022-08-05T00:07:22.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 86
      },
      {
        id: 85
      },
      {
        id: 84
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 6,
    UserId: 2,
    description: 'Beatae fuga et minus dolor quod.',
    createdAt: '2022-08-05T00:00:17.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 23
      },
      {
        id: 22
      },
      {
        id: 21
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 49,
    UserId: 6,
    description:
      'Enim facilis sint neque voluptates. Ut veniam illo. Error adipisci non beatae distinctio rem et doloribus impedit ut.\n \rQui illo d',
    createdAt: '2022-08-04T22:41:14.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 152
      },
      {
        id: 151
      },
      {
        id: 150
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 30,
    UserId: 4,
    description: 'Repellat libero quos.',
    createdAt: '2022-08-04T22:25:48.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 95
      },
      {
        id: 94
      },
      {
        id: 93
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 35,
    UserId: 5,
    description:
      'Magni odit at quia quaerat dolorum. Veritatis voluptas ducimus molestiae non eum alias distinctio dignissimos. Voluptatem qui et c',
    createdAt: '2022-08-04T21:42:21.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 110
      },
      {
        id: 109
      },
      {
        id: 108
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 41,
    UserId: 6,
    description: 'et vel magni',
    createdAt: '2022-08-04T21:27:05.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 128
      },
      {
        id: 127
      },
      {
        id: 126
      },
      {
        id: 1
      }
    ],
    Likes: [],
    replyCount: 4,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 17,
    UserId: 3,
    description: 'Vitae perspiciatis eum adipisci ratione.',
    createdAt: '2022-08-04T21:19:47.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 56
      },
      {
        id: 55
      },
      {
        id: 54
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 29,
    UserId: 4,
    description: 'Rerum sit ut cum non.',
    createdAt: '2022-08-04T20:45:39.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 92
      },
      {
        id: 91
      },
      {
        id: 90
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 18,
    UserId: 3,
    description:
      'Quibusdam beatae quia inventore sed. Dignissimos quo nobis alias. Doloremque porro reiciendis ut corrupti illum. Expedita cupidita',
    createdAt: '2022-08-04T20:36:15.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 59
      },
      {
        id: 58
      },
      {
        id: 57
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 5,
    UserId: 2,
    description:
      'Corrupti maxime nisi cum nisi provident id non. Omnis harum deleniti. Nulla itaque omnis hic debitis accusamus. Vel ea nobis est a',
    createdAt: '2022-08-04T20:22:54.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 20
      },
      {
        id: 19
      },
      {
        id: 18
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 46,
    UserId: 6,
    description:
      'Nemo vel beatae velit est sit pariatur. Fuga distinctio aspernatur reprehenderit quibusdam totam dolorem. Voluptatem et quod adipi',
    createdAt: '2022-08-04T20:17:42.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 143
      },
      {
        id: 142
      },
      {
        id: 141
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 14,
    UserId: 3,
    description: 'et',
    createdAt: '2022-08-04T20:05:34.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 47
      },
      {
        id: 46
      },
      {
        id: 45
      }
    ],
    Likes: [
      {
        id: 6,
        UserId: 2,
        TweetId: 14,
        createdAt: '2022-08-07T14:44:09.000Z',
        updatedAt: '2022-08-07T14:44:09.000Z'
      }
    ],
    replyCount: 3,
    likeCount: 1,
    isLiked: true
  },
  {
    id: 43,
    UserId: 6,
    description:
      'Laborum assumenda in est ea sed et nisi ea cumque.\nAccusantium quas eum mollitia dignissimos maiores autem dolores quia necessitat',
    createdAt: '2022-08-04T20:03:47.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 134
      },
      {
        id: 133
      },
      {
        id: 132
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 26,
    UserId: 4,
    description: 'explicabo',
    createdAt: '2022-08-04T19:32:25.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 83
      },
      {
        id: 82
      },
      {
        id: 81
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 22,
    UserId: 4,
    description:
      'Voluptatem et dicta repudiandae itaque esse eos non voluptas.',
    createdAt: '2022-08-04T19:11:53.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 71
      },
      {
        id: 70
      },
      {
        id: 69
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 38,
    UserId: 5,
    description:
      'Vero delectus porro. Rerum eum placeat eveniet architecto neque temporibus blanditiis quia. Omnis molestiae consequatur qui sapien',
    createdAt: '2022-08-04T17:13:07.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 119
      },
      {
        id: 118
      },
      {
        id: 117
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 25,
    UserId: 4,
    description: 'sed voluptatem saepe',
    createdAt: '2022-08-04T17:04:15.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 80
      },
      {
        id: 79
      },
      {
        id: 78
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 8,
    UserId: 2,
    description:
      'Sit fuga consectetur eaque quia. Possimus ex eum qui quas aut architecto qui. Id sed dicta ut illo qui consequatur nulla cum modi.',
    createdAt: '2022-08-04T17:01:58.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 29
      },
      {
        id: 28
      },
      {
        id: 27
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 15,
    UserId: 3,
    description: 'Id qui corporis iusto non qui.\nVeritatis debitis quae non.',
    createdAt: '2022-08-04T16:51:29.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 50
      },
      {
        id: 49
      },
      {
        id: 48
      }
    ],
    Likes: [
      {
        id: 7,
        UserId: 2,
        TweetId: 15,
        createdAt: '2022-08-07T14:44:11.000Z',
        updatedAt: '2022-08-07T14:44:11.000Z'
      }
    ],
    replyCount: 3,
    likeCount: 1,
    isLiked: true
  },
  {
    id: 48,
    UserId: 6,
    description:
      'Maxime ut placeat corrupti nam perferendis ea voluptates ut consequatur.',
    createdAt: '2022-08-04T16:11:36.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 149
      },
      {
        id: 148
      },
      {
        id: 147
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 13,
    UserId: 3,
    description: 'ullam ea cum',
    createdAt: '2022-08-04T16:04:16.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 44
      },
      {
        id: 43
      },
      {
        id: 42
      }
    ],
    Likes: [
      {
        id: 5,
        UserId: 2,
        TweetId: 13,
        createdAt: '2022-08-07T14:44:06.000Z',
        updatedAt: '2022-08-07T14:44:06.000Z'
      }
    ],
    replyCount: 3,
    likeCount: 1,
    isLiked: true
  },
  {
    id: 21,
    UserId: 4,
    description: 'similique',
    createdAt: '2022-08-04T15:49:22.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 68
      },
      {
        id: 67
      },
      {
        id: 66
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 10,
    UserId: 2,
    description: 'aut',
    createdAt: '2022-08-04T13:44:39.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 2,
      account: 'user1',
      name: 'user1',
      avatar: null,
      introduction:
        'Et sint quaerat ad qui sit. Dolore tempore totam excepturi id aut id deleniti. Voluptas incidunt voluptatem officiis.\n \rBeatae assumenda eos beatae au',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 35
      },
      {
        id: 34
      },
      {
        id: 33
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 44,
    UserId: 6,
    description: 'Commodi totam reprehenderit voluptatem.',
    createdAt: '2022-08-04T13:37:00.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 137
      },
      {
        id: 136
      },
      {
        id: 135
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 39,
    UserId: 5,
    description:
      'Unde sunt qui delectus necessitatibus.\nSed ipsam voluptatem dicta eveniet natus sed unde tenetur voluptatem.\nSoluta ut quod quis v',
    createdAt: '2022-08-04T13:26:24.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 122
      },
      {
        id: 121
      },
      {
        id: 120
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 31,
    UserId: 5,
    description:
      'Enim suscipit voluptas ipsa accusantium voluptatem deleniti pariatur aliquam. Id quis excepturi magnam iure quas harum vel non. Si',
    createdAt: '2022-08-04T12:15:44.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 98
      },
      {
        id: 97
      },
      {
        id: 96
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 24,
    UserId: 4,
    description: 'sunt',
    createdAt: '2022-08-04T11:28:25.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 77
      },
      {
        id: 76
      },
      {
        id: 75
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 16,
    UserId: 3,
    description:
      'Rerum odio id voluptas corrupti.\nNemo sapiente dolores ea dolores non.\nEst ut voluptatem a minus consequatur aut ratione ea nisi.\n',
    createdAt: '2022-08-04T11:22:50.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 53
      },
      {
        id: 52
      },
      {
        id: 51
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 45,
    UserId: 6,
    description: 'voluptas',
    createdAt: '2022-08-04T11:15:06.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 140
      },
      {
        id: 139
      },
      {
        id: 138
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 50,
    UserId: 6,
    description:
      'Quod ea consequuntur doloremque laborum distinctio numquam odio deserunt.\nVitae praesentium libero ex.\nIste fugit ut veritatis dol',
    createdAt: '2022-08-04T10:21:37.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 155
      },
      {
        id: 154
      },
      {
        id: 153
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 34,
    UserId: 5,
    description: 'Ipsum ut consequatur aut nemo neque.',
    createdAt: '2022-08-04T10:16:41.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 107
      },
      {
        id: 106
      },
      {
        id: 105
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 20,
    UserId: 3,
    description: 'delectus',
    createdAt: '2022-08-04T10:16:25.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 65
      },
      {
        id: 64
      },
      {
        id: 63
      },
      {
        id: 2
      }
    ],
    Likes: [],
    replyCount: 4,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 33,
    UserId: 5,
    description:
      'Sunt similique rem ducimus nisi est officia. Quidem enim ex. Itaque est accusamus corporis quo molestiae fuga quia et rerum. Id ip',
    createdAt: '2022-08-04T10:00:52.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 104
      },
      {
        id: 103
      },
      {
        id: 102
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 19,
    UserId: 3,
    description: 'sed',
    createdAt: '2022-08-04T10:00:40.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 3,
      account: 'user2',
      name: 'user2',
      avatar: null,
      introduction:
        'Tempore repudiandae saepe qui.\nAut assumenda optio alias aliquid ipsum error corporis consectetur excepturi.\nAtque in distinctio accusamus vel error n',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 62
      },
      {
        id: 61
      },
      {
        id: 60
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 32,
    UserId: 5,
    description: 'voluptatem eius accusamus',
    createdAt: '2022-08-04T09:51:18.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 101
      },
      {
        id: 100
      },
      {
        id: 99
      },
      {
        id: 5
      }
    ],
    Likes: [],
    replyCount: 4,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 23,
    UserId: 4,
    description: 'Ut officia quisquam impedit itaque tenetur.',
    createdAt: '2022-08-04T09:16:44.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 4,
      account: 'user3',
      name: 'user3',
      avatar: null,
      introduction:
        'Corrupti ea neque qui iusto a aut assumenda doloribus. Ratione in libero. Ea totam provident consectetur quasi perspiciatis aliquam. Aut ipsam repella',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 74
      },
      {
        id: 73
      },
      {
        id: 72
      },
      {
        id: 4
      }
    ],
    Likes: [],
    replyCount: 4,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 37,
    UserId: 5,
    description: 'aut',
    createdAt: '2022-08-04T08:08:44.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 5,
      account: 'user4',
      name: 'user4',
      avatar: null,
      introduction: 'Et voluptates alias eligendi perspiciatis.',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 116
      },
      {
        id: 115
      },
      {
        id: 114
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  },
  {
    id: 47,
    UserId: 6,
    description:
      'In ullam odio aut doloremque delectus ut laudantium.\nVelit voluptatem praesentium ut repellendus odit.\nPraesentium deserunt optio ',
    createdAt: '2022-08-04T07:29:13.000Z',
    updatedAt: '2022-08-05T07:08:50.000Z',
    User: {
      id: 6,
      account: 'user5',
      name: 'user5',
      avatar: null,
      introduction: 'ut',
      role: 'user',
      front_cover: null
    },
    Replies: [
      {
        id: 146
      },
      {
        id: 145
      },
      {
        id: 144
      }
    ],
    Likes: [],
    replyCount: 3,
    likeCount: 0,
    isLiked: false
  }
]
const dummyUser = {
  id: 5,
  account: 'user4',
  name: 'user4',
  avatar: null,
  introduction: 'Et voluptates alias eligendi perspiciatis.',
  role: 'user',
  front_cover: null
}

export default {
  name: 'Main',
  components: {
    NavTabs,
    UserPopular,
    TweetCard,
    TweetCreateCard
  },
  data() {
    return {
      tweets: [],
      currentUser: { ...dummyUser }
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    fetchTweets() {
      // TODO: API GET tweets
      this.tweets = dummyTweets.map((tweet) => ({
        id: tweet.id,
        description: tweet.description,
        createdAt: tweet.createdAt,
        User: tweet.User,
        replyCount: tweet.replyCount,
        likeCount: tweet.likeCount,
        isLiked: tweet.isLiked
      }))
    },
    afterAddLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: true,
            likeCount: tweet.likeCount + 1
          }
        }
        return tweet
      })
    },
    afterRemoveLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: false,
            likeCount: tweet.likeCount - 1
          }
        }
        return tweet
      })
    },
    afterCreateTweet(newTweet) {
      this.tweets.unshift(newTweet)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.main {
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .title {
    height: 74px;
    padding: 24px;
    border-left: 1px solid $light-blue2;
    border-right: 1px solid $light-blue2;
    border-bottom: 1px solid $light-blue2;
    backdrop-filter: blur(3px);
    font-weight: 700;
    position: sticky;
    top: 0;
  }
}
</style>

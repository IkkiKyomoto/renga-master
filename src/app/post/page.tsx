import React from 'react'
import PostList from '@/app/ui/post/post-list'
import PostWrapper from '@/app/ui/post/post-wrapper'

export default function Page() {
    return (
        <div>
            <h1>投稿一覧</h1>
            <div>
                <div>
                    <PostWrapper />
                </div>
                <div>
                    <PostList />
                </div>
            </div>
        </div>
    )
}
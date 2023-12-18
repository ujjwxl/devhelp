import React from 'react'
import Card from '../Card/Card'

export default function SavedProjectsComponent() {
    return (
        <div className='workspace'>
            <h1 className="ws-h1 ">Saved Projects</h1>
            <div className="ws-card">
                <Card saved={true}></Card>
            </div>
        </div>
    )
}

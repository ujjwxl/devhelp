import React from 'react'
import Card from '../Card/Card'

export default function SavedProjectsComponent() {
    return (
        <div className='workspace'>
            <p className="ws-p">Saved Projects</p>
            <div className="ws-card">
                <Card saved={true}></Card>
            </div>
        </div>
    )
}

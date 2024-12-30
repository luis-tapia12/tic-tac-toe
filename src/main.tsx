import { render } from 'preact'
import { App } from './app.tsx'

import GameProvider from './context/gameContext.tsx'
import './index.css'

render(<GameProvider>
    <App />
</GameProvider>, document.getElementById('app')!)

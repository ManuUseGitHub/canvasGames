import { drawGame } from './Drawings';
import { Canvas } from './components/Canvas';
import { ApplicationContextType, CellAddress, GamePiece, Point } from './resources/types';
import { getPoint, useHooks } from './hooks/useHooks';
import './style.scss'

import { createContext, useEffect, useState } from 'react';
import { _2π } from './resources/constantes';
import { findPiece, setFoundPieceAt } from './business/game';
import { detectDraggedFrom, detectReserveSelection } from './business/detection';
import { Debugging } from './components/debugging';
import { initializeState } from './resources/gameCreator';
import { updatedCoords } from './business/coordinates';
import { pushDebugMessage } from './resources/textHelper';
import { GAME_STATE } from './resources/messageConstants';
import { GameBoard } from './components/game/gameBoard';
import store from './redux/store';

const ApplicationContext = createContext<ApplicationContextType | null>(null);
function App() {

  const [position, setPosition] = useState(getPoint());

  let context: ApplicationContextType = Object.assign(useHooks(), { position, setPosition })
  const state = store.getState();

  useEffect(() => {
    context.setReservePiecesCoords(
      updatedCoords(context.gamePieces.game)
    );
  }, [context.gamePieces]);
  useEffect(() => {
    context.setReservePiecesCoords(initializeState(context.gamePieces));
    context.setGameState("1");
  }, [])

  const {
    gamePieces,
    setSelectedGamePiece
  } = context;

  useEffect(() => {
    detectDraggedFrom(context.coords, context)
  }, [context.coords]);

  useEffect(() => {
    detectReserveSelection(context.coords, context);
    pushDebugMessage(context, GAME_STATE, [
      `game is : ${context.gameState}
    position is : ${JSON.stringify(context.position)},
    translation is : ${JSON.stringify(context.translation)},
    mouse is :`,
      {
        codeBlock: JSON.stringify(
          {
            at: context.coords,
            from: context.draggedFrom,
            dragging: context.mouseIsDragging,
            down: context.mouseIsDown,
            moving: context.mouseIsMoving
          }
          , null, 2), language: "tsx"
      },`redux :`,
      {
        codeBlock: JSON.stringify(state, null, 2), language: "tsx"
      },
      "reserve:",
      { codeBlock: JSON.stringify(context.pieceOfReserve, null, 2), language: "tsx" },
      "piece:",
      { codeBlock: JSON.stringify(context.selectedGamePiece), language: "tsx" },
      {
        codeBlock: JSON.stringify(
          {
            badDrops: context.badDropMoves
          }
          , null, 2), language: "tsx"
      },
    ],)
    //reserve: ${JSON.stringify(context.pieceOfReserve, null, 2)},

  }, [context.coords, context.mouseIsMoving, context.mouseIsDown, context.timer,state])

  useEffect(() => {
    setFoundPieceAt({ i: 1, j: 1 }, gamePieces, setSelectedGamePiece);

    //context.setReservePiecesCoords(coords);
  }, []);

  const draw: (ctx: any, frameCount: number) => void = (ctx, frameCount: number) => {
    drawGame(ctx, context);
  }

  useEffect(() => {
    if (!context.timer) {
      context.setTimer(setTimeout(() => {
        context.setMouseIsMoving(false);

        clearTimeout(context.timer)
        context.setTimer(undefined)

      }, 300));
    };
  }, [context.coords]);

  return (
    <ApplicationContext.Provider value={context} >
      <div className="App">
        
        <GameBoard></GameBoard>
        <Debugging></Debugging>
      </div>
    </ApplicationContext.Provider>
  );
}

export { ApplicationContext }
export default App;


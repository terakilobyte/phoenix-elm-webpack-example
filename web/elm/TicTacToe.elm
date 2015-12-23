module TicTacToe where


import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import StartApp.Simple as StartApp


-- MODEL
type alias Game =
  {
    board: List Int,
    playerTurn: Bool
  }

initialModel :  Game
initialModel =
  { board = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    playerTurn = False
  }

-- UPDATE

type Action = PlayerMove Int | ComputerMove Int | EndGame


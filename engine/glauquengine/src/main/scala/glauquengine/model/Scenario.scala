import Scenario.COUNTER

import scala.collection.mutable.ArrayBuffer

object Scenario {
    var COUNTER = 0
}
class Scenario(var title: String) {
    val id = COUNTER
    COUNTER+=1
    val stages: ArrayBuffer[Stage] = ArrayBuffer[Stage]()
}
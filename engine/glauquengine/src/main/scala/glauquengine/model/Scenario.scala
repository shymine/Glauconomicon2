import Scenario.COUNTER
import org.graalvm.compiler.phases.common.NodeCounterPhase.Stage

import scala.collection.mutable.ArrayBuffer

object Scenario {
    var COUNTER = 0
}
class Scenario(var title: String) {
    val id = COUNTER
    COUNTER+=1
    val stages: ArrayBuffer[(Stage, Int)] = ArrayBuffer[Stage]()

    def addStage(stage: Stage): Unit = {
        stages += (stage, stages.length)
    }
}
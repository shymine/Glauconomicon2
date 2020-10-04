import Stage.COUNTER

object Stage {
    var COUNTER = 0
}
class Stage(var title: String, var description: String) {
    val id = COUNTER
    COUNTER+=1
}
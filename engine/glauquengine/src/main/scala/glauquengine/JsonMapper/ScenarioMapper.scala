
object ScenarioMapper {

    def toJson(scenario: Scenario): String {
        val builder = StringBuilder.newBuilder
        builder.append ("{'title':")
        builder.append (scenario.title)
        builder.append (", 'stages':[")
        var first = true
        for (stage, order <- scenario.stages) {
            if(!first) {
                builder.append(", ")
            } else {
                first = false
            }
            builder.append("(")
            builder.append(stage.id)
            builder.append(", ")
            builder.append(order)
            builder.append(")")
        }
        builder.append("]}")
        return builder.toString()
    }

    def toJson(scenarii: List[Scenario]): String {
        val builder = StringBuilder.newBuilder
        builder.append("{'scenario': [")
        var first = true
        for (scenario <- scenarii) {
            if(!first) {
                builder.append(", ")
            } else {
                first = false
            }
            builder.append(scenario.id)
        }
        builder.append("]}")
        return builder.toString()
    }
}
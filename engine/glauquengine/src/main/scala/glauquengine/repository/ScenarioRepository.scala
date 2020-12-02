import scala.collection.mutable.ArrayBuffer


object ScenarioRepository {
    private val scenarii: ArrayBuffer[Scenario] = ArrayBuffer[Scenario]()

    def get(id: Int): Option[Scenario] = {
        return scenarii.find(s => s.id == id)
    }

    def add(scenario: Scenario): Unit = {
        scenarii += scenario
    }

    def getList(filter: (Scenario) => Boolean = (_: Scenario) => true): List[Scenario] = {
        return scenarii.filter(filter).toList
    }

    def delete(id: Int): Option[String] = {
        val scenar = scenarii.find(s => s.id == id)
        if(scenar.isEmpty) {
            return None
        }
        scenarii -= scenar.get
        return Some("ok")
    }
}
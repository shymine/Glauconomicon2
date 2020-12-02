package glauquengine

import org.scalatra._
import scala.util.parsing.json.JSON._

class GlaucServlet extends ScalatraServlet {

    var currentScenario = _

    /*    get("/") {
            views.html.hello()
        }*/

    post("/scenario/create/:title") {
        val scenar = new Scenario(params("title"))
        ScenarioRepository.add(scenar)
        return ScenarioMapper.toJSON(scenar)
    }

    get("/scenario/list") {
        return ScenarioMapper.toJSON(ScenarioRepository.getList())
    }

    delete("/scenario/delete/:id") {
        val del = ScenarioRepository.delete(params("id"))
        if(del.isEmpty) {
            return "{'error': 'ko'}"
        } else {
            return "{'error': 'ok'}"
        }
    }

    get("/scenario/get/:id") {
        val scenario = ScenarioRepository.get(params("id"))
        if(scenario.isEmpty) {
            return "{'error': 'id'}"
        } else {
            return ScenarioMapper(scenario.get)
        }
    }

    // the json in the body is an empty key for params
    // {'title': 'truc', 'description': 'machin'}
    post("/scenario/:id/addStage/") {
        val stage_map = parseFull(params())
        if(stage_map.isEmpty) {
            return "{'error': 'stage'}"
        }
        val scenario = ScenarioRepository.get(params("id"))
        if (scenario.isEmpty) {
            return "{'error': 'id'}"
        }
        scenario.get.addStage(new Stage(stage_map.get("title"), stage_map.get("description")))
        return "{'error': 'ok'}"
    }

    put("/scenario/modify/:id/:title") {
        val scenario = ScenarioRepository.get(params("id"))
        if (scenario.isEmpty) {
            return "{'error': 'id'}"
        }
        scenario.get.title = title
        return "{'error': 'ok'}"
    }

    /////////////////////////////////

    get("/stage/get/:id") {

    }



}

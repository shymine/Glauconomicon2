package glauquengine

import org.scalatra.test.scalatest._

class GlaucServletTests extends ScalatraFunSuite {

  addServlet(classOf[GlaucServlet], "/*")

  test("GET / on GlaucServlet should return status 200") {
    get("/") {
      status should equal (200)
    }
  }

}

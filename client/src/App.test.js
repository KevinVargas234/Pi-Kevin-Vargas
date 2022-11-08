import { render,screen } from "@testing-library/react";
import Card from "../src/components/Card/Card"
import { Link,BrowserRouter } from "react-router-dom";
describe("card",()=>{
    test("deberia tener un elemento Link si la prop use_link es true",()=>{
        render(
        <BrowserRouter>
          <Card name="pug" temperaments = {["curious","playfull"]} weight = {[10,20]} id = {0} use_link ={true} />
        </BrowserRouter>
        );
        expect(screen.getByRole("link")).toBeInTheDocument();
    });
    test("no deberia tener un elemento Link si la prop use_link es false",()=>{
      render(
      <BrowserRouter>
        <Card name="pug" temperaments = {["curious","playfull"]} weight = {[10,20]} id = {0} use_link ={false} />
      </BrowserRouter>
      );
      expect(screen.queryByRole("link")).toBeNull();
    });



})

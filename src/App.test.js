import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./home";
import App from './App';
import Add from './Add';
import { BrowserRouter} from "react-router-dom";


test("testcase0", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const linkElement = screen.getByRole("button", { name: "Add+" });
  expect(linkElement).toBeInTheDocument();
});


test("test addbutton", () => {
  render(
    <BrowserRouter>
      <App />
      </BrowserRouter>
    );
   

  const linkElement = screen.getByRole("button", { name: "Add+" });
  fireEvent.click(linkElement);
  const result=screen.getByText(/ADD/);
  expect(result).toBeInTheDocument();
  });

test("test addmodule content checking", () => {
    render(
      <BrowserRouter>
        <Add />
        </BrowserRouter>
      );
    const title=screen.getByText(/ADD/);
    expect(title).toBeInTheDocument();
    const firstname=screen.getByPlaceholderText('firstname');
    expect(firstname).toBeInTheDocument();
    const lastname=screen.getByPlaceholderText('lastname');
    expect(lastname).toBeInTheDocument();
    const email=screen.getByPlaceholderText('email');
    expect(email).toBeInTheDocument();
    const mobile=screen.getByPlaceholderText('mobilenumber');
    expect(mobile).toBeInTheDocument();
    const dob=screen.getByTestId('dob');
    expect(dob).toBeInTheDocument();
    const submit=screen.getByTestId('submitbtn');
    expect(submit).toBeInTheDocument();
    }); 

    test("add emailchecking test0",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const email=screen.getByPlaceholderText('email');
        fireEvent.change(email,{target:{value:5}});
        const result=screen.getByText('*Invalid');
    });

    test("add emailchecking test1",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const email=screen.getByPlaceholderText('email');
        fireEvent.change(email,{target:{value:'ragul86100@'}});
        const result=screen.getByText('*Invalid');
        expect(result).toBeInTheDocument();
    });
    test("add emailchecking test2",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const email=screen.getByPlaceholderText('email');
        fireEvent.change(email,{target:{value:'ragul86100@gmail.'}});
        const result=screen.getByText('*Invalid');
    });

    test("add emailchecking test3",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const email=screen.getByPlaceholderText('email');
        fireEvent.change(email,{target:{value:'ragul86100gmail.'}});
        const result=screen.getByText('*Invalid');
        expect(result).toBeInTheDocument();
    });

    test("add firstnamechecking test1",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const firstname=screen.getByPlaceholderText('firstname');
        fireEvent.change(firstname,{target:{value:'ragul86100gmail.'}});
        const result=screen.getByText('*no number and spl');
        expect(result).toBeInTheDocument();
    });
    test("add firstnamechecking test2",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const firstname=screen.getByPlaceholderText('firstname');
        fireEvent.change(firstname,{target:{value:'ra'}});
        const result=screen.getByText('*min three char');
        expect(result).toBeInTheDocument();
    });

    test("add lastnamechecking test1",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const lastname=screen.getByPlaceholderText('lastname');
        fireEvent.change(lastname,{target:{value:'12'}});
        const result=screen.getByText('*no number and spl');
        expect(result).toBeInTheDocument();
    });
    test("add lastnamechecking test2",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const lastname=screen.getByPlaceholderText('lastname');
        fireEvent.change(lastname,{target:{value:'ragu man'}});
        const result=screen.getByText('*no number and spl');
        expect(result).toBeInTheDocument();
    });

    test("add mobile test1",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const mobile=screen.getByPlaceholderText('mobilenumber');
        fireEvent.change(mobile,{target:{value:'1234567'}});
        const result=screen.getByText('*must be 10 digit');
        expect(result).toBeInTheDocument();
    });


    test("add mobile test2",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const mobile=screen.getByPlaceholderText('mobilenumber');
        fireEvent.change(mobile,{target:{value:'123456789011'}});
        const result=screen.getByText('*must be 10 digit');
        expect(result).toBeInTheDocument();
    });
    test("addfunctionality",()=>{
      render(
        <BrowserRouter>
          <Add />
          </BrowserRouter>
        );
        const email=screen.getByPlaceholderText('email');
        fireEvent.change(email,{target:{value:'jos@gmail.com'}});
        const firstname=screen.getByPlaceholderText('firstname');
        fireEvent.change(firstname,{target:{value:'joooooo'}});
        const lastname=screen.getByPlaceholderText('lastname');
        fireEvent.change(lastname,{target:{value:'mmmm'}});
        
        const mobile=screen.getByPlaceholderText('mobilenumber');
        fireEvent.change(mobile,{target:{value:'123456789011'}});
        const dob=screen.getByTestId('dob');
        fireEvent.change(dob,{target:{value:'2003-05-15'}});
        const Address=screen.getByPlaceholderText('Max50charactor');
        fireEvent.change(Address,{target:{value:'aaaaaa'}});
        const submit=screen.getByTestId('submitbtn');
        const message=screen.getByTestId('popmessage');
        fireEvent.click(submit);
        expect(message).toBeInTheDocument();
    });

package com.gogo.jhidemo.cucumber.stepdefs;

import com.gogo.jhidemo.JhiApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JhiApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}

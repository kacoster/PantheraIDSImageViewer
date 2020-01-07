################################################################################
#  Copyright (C) 2019 Ross Tyzack Pitman | Panthera Corporation
#  This program is free software: you can redistribute it and/or modify it under
#  the terms of the GNU General Public License as published by the Free Software
#  Foundation, either version 3 of the License, or any later version.
#  This program is distributed in the hope that it will be useful, but WITHOUT
#  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
#  FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
#  details.
#  You have received a copy of the GNU General Public License along with this
#  program (see /app/licence/; otherwise go to http://www.gnu.org/licenses/).
################################################################################
#  Panthera body server script for image classification (user-defined)
#  pages/body/server/img_clssfctn_ud_body_server_dynmc_ui.R
################################################################################
    output$img_clssfctn_ud_dt_src <- renderUI({

      if (input$img_clssfctn_ud_src_inpt == translate()$t("From computer")) {

        div(

          fluidRow(
            column(
              3,
              tags$div(
                title = translate()$t(
                  "Database (.Rdata)"
                ),
                popify(
                  fileInput(
                    "img_clssfctn_ud_cld_dtbs",
                    translate()$t(
                      "Database (.Rdata)"
                    ),
                    buttonLabel = translate()$t(
                      "Browse..."
                    ),
                    placeholder = translate()$t(
                      "No file selected"
                    ),
                    multiple = FALSE,
                    accept = c(
                      ".Rdata"
                    )
                  ),
                  title = translate()$t(
                    "Classified Database"
                  ),
                  content = translate()$t(
                    paste0(
                      "Click this button to select the database whose ",
                      "data you wish to classify. Depending on the size ",
                      "of the database, this might take some time to load."
                    )
                  ),
                  placement = "bottom",
                  trigger = "focus",
                  options = list(
                    container = "body"
                  )
                )
              )
            ),

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_spcs_fltr",
                  translate()$t(
                    "Species"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Species Loaded"
                  ),
                  multiple = FALSE
                ),
                title = translate()$t(
                  "Select a Species"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a species you wish ",
                    "to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ), # column

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_sttn_fltr",
                  translate()$t(
                    "Station"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Stations Loaded"
                  ),
                  multiple = TRUE,
                  selected = translate()$t(
                    "All"
                  )
                ),
                title = translate()$t(
                  "Select a Station"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a station, or group ",
                    "of stations, you wish to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ), # column

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_cmr_fltr",
                  translate()$t(
                    "Camera"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Cameras Loaded"
                  ),
                  multiple = TRUE,
                  selected = translate()$t(
                    "All"
                  )
                ),
                title = translate()$t(
                  "Select a Camera"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a camera, or group ",
                    "of cameras, you wish to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ) # column

          ), # fluidRow

          fluidRow(
            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_extrnl_img_lc",
                  translate()$t(
                    "External Images?"
                  ),
                  width = "100%",
                  choices = c(
                    translate()$t(
                      "Yes"
                    ),
                    translate()$t(
                      "No"
                    )
                  ),
                  selected = translate()$t(
                    "No"
                  )
                ),
                title = translate()$t(
                  "Image Location"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to specify where the camera trap ",
                    "images are located. PantheraIDS has the ability to ",
                    "locate camera trap images in two ways; 1) PantheraIDS ",
                    "will automatically search within the ids_volume/data/images/ ",
                    "folder for the images related to your database, ",
                    "however if they aren’t there, 2) PantheraIDS will ",
                    "expect to search another directory, which you must ",
                    "specify. If the images are located within another ",
                    "directory (perhaps an external drive?), choose Yes ",
                    "for External Images?. If you selected Yes, the next ",
                    "step is to specify where that directory is."
                  )
                ),
                placement = "right",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )
            ), # column

            column(
              3,
              tags$div(
                tags$label(
                  translate()$t(
                    "External Image Directory"
                  )
                ),
                tags$span(
                  shinyFiles::shinyDirButton(
                    "img_clssfctn_ud_extrnl_img_button",
                    translate()$t(
                      "Browse..."
                    ),
                    title = translate()$t(
                      "Browse to the external image directory:"
                    ),
                    class = "btn btn-primary btn-block",
                    icon = icon(
                      "icon-gears"
                    )
                  )
                )
              )
            ), # column

            column(
              3,
              popify(
                sliderInput(
                  "img_clssfctn_ud_btch_img_thrshld",
                  translate()$t(
                    "Batch Image Size"
                  ),
                  width = "100%",
                  min = 10,
                  max = 100,
                  value = 50,
                  step = 1,
                  ticks = TRUE
                ),
                title = translate()$t(
                  "Batch Image Size"
                ),
                content = translate()$t(
                  paste0(
                    "Please specify the size of each image batch. ",
                    "Smaller batches will load faster, and so are ",
                    "recommended for slower computers."
                  )
                ),
                placement = "bottom",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )
            ), # column

            tags$script(
              HTML(
                "$(function(){
                      $(document).keyup(function(e) {
                      if (e.which == 112) {
                      $('#img_clssfctn_ud_fltr_button').click()
                      }
                      });
                      })"
              )
            ),

            bottom_padding,

            column(
              3,
              tags$div(
                popify(
                  actionButton(
                    "img_clssfctn_ud_fltr_button",
                    translate()$t(
                      "Filter [F1]"
                    ),
                    icon = icon(
                      "filter"
                    ),
                    style = paste0("background-color: #3C8C3F;  ",
                                   "border-color: #47A64A"),
                    class = "btn btn-primary btn-block"
                  ),
                  title = translate()$t(
                    "Filter"
                  ),
                  content = translate()$t(
                    paste0(
                      "Click this button to render the camera trap images as ",
                      "specified by your selection of species, station/s, ",
                      "and camera/s."
                    )
                  ),
                  placement = "bottom",
                  trigger = "hover",
                  options = list(
                    container = "body"
                  )
                )
              ), style = "margin-top: 25px;"
            ) # column

          ) # fluidRow

        ) # div

      } else if (
        input$img_clssfctn_ud_src_inpt == translate()$t("From server")){

        div(

          fluidRow(
            column(
              3,
              tags$div(
                title = translate()$t(
                  "Select Survey"
                ),
                popify(
                  selectInput(
                    "img_clssfctn_ud_ld_srvy_srvr",
                    translate()$t(
                      "Select Survey"
                    ),
                    width = "100%",
                    choices = c(
                      translate()$t(
                        "Please login to the database first..."
                      )
                    ),
                    multiple = TRUE
                  ),
                  title = translate()$t(
                    "Select Survey/s"
                  ),
                  content = translate()$t(
                    paste0(
                      "Select the survey you wish to load ",
                      "from the server."
                    )
                  ),
                  placement = "top",
                  trigger = "focus",
                  options = list(
                    container = "body"
                  )
                )
              )
            ),

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_srvr_spcs_fltr",
                  translate()$t(
                    "Species"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Species Loaded"
                  ),
                  multiple = FALSE
                ),
                title = translate()$t(
                  "Select a Species"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a species you wish ",
                    "to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ), # column

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_srvr_sttn_fltr",
                  translate()$t(
                    "Station"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Stations Loaded"
                  ),
                  multiple = TRUE,
                  selected = translate()$t(
                    "All"
                  )
                ),
                title = translate()$t(
                  "Select a Station"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a station, or group ",
                    "of stations, you wish to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ), # column

            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_srvr_cmr_fltr",
                  translate()$t(
                    "Camera"
                  ),
                  width = "100%",
                  choices = translate()$t(
                    "No Cameras Loaded"
                  ),
                  multiple = TRUE,
                  selected = translate()$t(
                    "All"
                  )
                ),
                title = translate()$t(
                  "Select a Camera"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to select a camera, or group ",
                    "of cameras, you wish to classify."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )

            ) # column

          ), # fluidRow

          fluidRow(
            column(
              3,
              popify(
                selectInput(
                  "img_clssfctn_ud_extrnl_img_lc",
                  translate()$t(
                    "External Images?"
                  ),
                  width = "100%",
                  choices = c(
                    translate()$t(
                      "Yes"
                    ),
                    translate()$t(
                      "No"
                    )
                  ),
                  selected = translate()$t(
                    "No"
                  )
                ),
                title = translate()$t(
                  "Image Location"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to specify where the camera trap ",
                    "images are located. PantheraIDS has the ability to ",
                    "locate camera trap images in two ways; 1) PantheraIDS ",
                    "will automatically search within the ids_volume/data/images/ ",
                    "folder for the images related to your database, ",
                    "however if they aren’t there, 2) PantheraIDS will ",
                    "expect to search another directory, which you must ",
                    "specify. If the images are located within another ",
                    "directory (perhaps an external drive?), choose Yes ",
                    "for External Images?. If you selected Yes, the next ",
                    "step is to specify where that directory is."
                  )
                ),
                placement = "right",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )
            ), # column

            column(
              3,
              tags$div(
                tags$label(
                  translate()$t(
                    "External Image Directory"
                  )
                ),
                tags$span(
                  shinyFiles::shinyDirButton(
                    "img_clssfctn_ud_extrnl_img_button",
                    translate()$t(
                      "Browse..."
                    ),
                    title = translate()$t(
                      "Browse to the external image directory:"
                    ),
                    class = "btn btn-primary btn-block",
                    icon = icon(
                      "icon-gears"
                    )
                  )
                )
              )
            ), # column

            column(
              3,
              popify(
                sliderInput(
                  "img_clssfctn_ud_srvr_btch_img_thrshld",
                  translate()$t(
                    "Batch Image Size"
                  ),
                  width = "100%",
                  min = 10,
                  max = 100,
                  value = 50,
                  step = 1,
                  ticks = TRUE
                ),
                title = translate()$t(
                  "Batch Image Size"
                ),
                content = translate()$t(
                  paste0(
                    "Please specify the size of each image batch. ",
                    "Smaller batches will load faster, and so are ",
                    "recommended for slower computers."
                  )
                ),
                placement = "bottom",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              )
            ), # column

            tags$script(
              HTML(
                "$(function(){
                        $(document).keyup(function(e) {
                        if (e.which == 112) {
                        $('#img_clssfctn_ud_fltr_button').click()
                        }
                        });
                        })"
              )
            ),

            bottom_padding,

            column(
              3,
              tags$div(
                popify(
                  actionButton(
                    "img_clssfctn_ud_fltr_button",
                    translate()$t(
                      "Filter [F1]"
                    ),
                    icon = icon(
                      "filter"
                    ),
                    style = paste0(
                      "background-color: #3C8C3F;  ",
                      "border-color: #47A64A"),
                    class = "btn btn-primary btn-block"
                  ),
                  title = translate()$t(
                    "Filter"
                  ),
                  content = translate()$t(
                    paste0(
                      "Click this button to render the camera trap images as ",
                      "specified by your selection of species, station/s, ",
                      "and camera/s."
                    )
                  ),
                  placement = "bottom",
                  trigger = "hover",
                  options = list(
                    container = "body"
                  )
                )
              ), style = "margin-top: 25px;"
            ) # column

          ) # fluidRow

        ) # div

      } else if (is.null(input$img_clssfctn_ud_src_inpt)){

        return(NULL)

      } else {

        return(NULL)

      }

    })
################################################################################
    output$img_clssfctn_ud_dt_edt <- renderUI({

      if (input$img_clssfctn_ud_src_inpt == translate()$t("From computer")) {

        div(
          column(
            2,
            popify(
              selectInput(
                "img_clssfctn_ud_spcs_nmbr",
                translate()$t(
                  "Number of species"
                ),
                width = "100%",
                choices = seq(1, 20, 1),
                selected = "1"
              ),
              title = translate()$t(
                "Number of Species"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify how many species are in the ",
                  "camera trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          column(
            3,
            popify(
              selectInput(
                "img_clssfctn_ud_spcs_nw",
                translate()$t(
                  "Species"
                ),
                width = "100%",
                choices = unique(
                  as.vector(
                    unlist(
                      dics$lprd_prgrm_spcs,
                      dics$jgr_prgrm_spcs,
                      dics$snw_lprd_prgrm_spcs
                    )
                  )
                ),
                multiple = TRUE
              ),
              title = translate()$t(
                "Species"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify the species, ",
                  "or group of species, present in the camera ",
                  "trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          column(
            3,
            popify(
              selectInput(
                "img_clssfctn_ud_nmbr_nw",
                translate()$t(
                  "Number"
                ),
                width = "100%",
                choices = c(
                  paste(
                    c(
                      seq(1,10,1),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 1)",
                    sep = " "),
                  paste(
                    c(
                      seq(1,10,1),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 2)",
                    sep = " "),
                  paste(
                    c(
                      seq(1,10,1),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 3)",
                    sep = " "),
                  paste(
                    c(
                      seq(1,10,1),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 4)",
                    sep = " "),
                  paste(
                    c(
                      seq(1,10,1),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 5)",
                    sep = " ")
                ),
                multiple = TRUE
              ),
              title = translate()$t(
                "Number"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify the number of individuals ",
                  "present in the camera trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          tags$script(
            HTML(
              "$(function(){
              $(document).keyup(function(e) {
              if (e.which == 113) {
              $('#img_clssfctn_ud_apply_edt_button').click()
              }
              });
              })"
            )
          ),
          column(
            2,
            tags$div(
              popify(
                actionButton(
                  "img_clssfctn_ud_apply_edt_button",
                  translate()$t(
                    "Apply [F2]"
                  ),
                  icon = icon("check"),
                  class = "btn btn-primary btn-block"
                ),
                title = translate()$t(
                  "Apply Changes"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to apply your edits. Please be aware that ",
                    "clicking this button will only save your edits within the ",
                    "computers memory, and thus allow you to move onto the next ",
                    "image. It does not permanently save your edits to your ",
                    "computer---this is done by the \"Save Changes\" button."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              ),
              style = "margin-top: 25px;"
            )
          ),
          tags$script(
            HTML(
              "$(function(){
              $(document).keyup(function(e) {
              if (e.which == 114) {
              $('#img_clssfctn_ud_sv_edt_button').click()
              }
              });
              })"
            )
          ),
          column(
            2,
            tags$div(
              popify(
                actionButton(
                  "img_clssfctn_ud_sv_edt_button",
                  translate()$t(
                    "Save Changes [F3]"
                  ),
                  icon = icon(
                    "floppy-o"
                  ),
                  class = "btn btn-primary btn-block"
                ),
                title = translate()$t(
                  "Save Changes"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to permanently save changes to your ",
                    "computer. This action will save a new database called ",
                    "dtbs.Rdata, which will be an exact copy of your original ",
                    "dtbs.Rdata, but contain your new edits."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              ),
              style = "margin-top: 25px;"
            )
          )
        ) # div

      } else if (
        input$img_clssfctn_ud_src_inpt == translate()$t("From server")){

        div(
          column(
            2,
            popify(
              selectInput(
                "img_clssfctn_ud_srvr_spcs_nmbr",
                translate()$t(
                  "Number of species"
                ),
                width = "100%",
                choices = seq(
                  1,
                  20,
                  1
                ),
                selected = "1"
              ),
              title = translate()$t(
                "Number of Species"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify how many species are in the ",
                  "camera trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          column(
            3,
            popify(
              selectInput(
                "img_clssfctn_ud_srvr_spcs_nw",
                translate()$t(
                  "Species"
                ),
                width = "100%",
                choices = unique(
                  as.vector(
                    unlist(
                      dics$lprd_prgrm_spcs,
                      dics$jgr_prgrm_spcs,
                      dics$snw_lprd_prgrm_spcs
                    )
                  )
                ),
                multiple = TRUE
              ),
              title = translate()$t(
                "Species"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify the species, or group of species, ",
                  "present in the camera trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          column(
            3,
            popify(
              selectInput(
                "img_clssfctn_ud_srvr_nmbr_nw",
                translate()$t(
                  "Number"
                ),
                width = "100%",
                choices = c(
                  paste(
                    c(
                      seq(
                        1,
                        10,
                        1
                      ),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 1)",
                    sep = " "
                  ),
                  paste(
                    c(
                      seq(
                        1,
                        10,
                        1
                      ),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 2)",
                    sep = " "),
                  paste(
                    c(
                      seq(
                        1,
                        10,
                        1
                      ),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 3)",
                    sep = " "),
                  paste(
                    c(
                      seq(
                        1,
                        10,
                        1
                      ),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 4)",
                    sep = " "),
                  paste(
                    c(
                      seq(
                        1,
                        10,
                        1
                      ),
                      "11-50",
                      "51+"),
                    "(",
                    translate()$t(
                      "Species"
                    ),
                    " 5)",
                    sep = " ")
                ),
                multiple = TRUE
              ),
              title = translate()$t(
                "Number"
              ),
              content = translate()$t(
                paste0(
                  "Click this button to specify the number of individuals ",
                  "present in the camera trap image."
                )
              ),
              placement = "top",
              trigger = "focus",
              options = list(
                container = "body"
              )
            )
          ),
          tags$script(
            HTML(
              "$(function(){
               $(document).keyup(function(e) {
               if (e.which == 113) {
               $('#img_clssfctn_ud_apply_edt_button').click()
               }
               });
               })"
            )
          ),
          column(
            2,
            tags$div(
              popify(
                actionButton(
                  "img_clssfctn_ud_srvr_apply_edt_button",
                  translate()$t(
                    "Apply [F2]"
                  ),
                  icon = icon(
                    "check"
                  ),
                  class = "btn btn-primary btn-block"
                ),
                title = translate()$t(
                  "Apply Changes"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to apply your edits. Please be aware that ",
                    "clicking this button will only save your edits within the ",
                    "computers memory, and thus allow you to move onto the next ",
                    "image. It does not permanently save your edits to the ",
                    "server---this is done by the \"Save to server\" button."
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              ),
              style = "margin-top: 25px;"
            )
          ),
          column(
            2,
            tags$div(
              popify(
                actionButton(
                  "img_clssfctn_ud_srvr_sv_edt_button",
                  translate()$t(
                    "Save to server"
                  ),
                  icon = icon(
                    "floppy-o"
                  ),
                  class = "btn btn-primary btn-block"
                ),
                title = translate()$t(
                  "Save to server"
                ),
                content = translate()$t(
                  paste0(
                    "Click this button to submit your edits to the server"
                  )
                ),
                placement = "top",
                trigger = "focus",
                options = list(
                  container = "body"
                )
              ),
              style = "margin-top: 25px;"
            )
          )
        ) # div

      } else if (is.null(input$img_clssfctn_ud_src_inpt)){

        return(NULL)

      } else {

        return(NULL)

      }

    })
################################################################################
    output$img_clssfctn_ud_body_ui_fltr_imgs <- renderUI({
      tags$div(

        fluidRow(
          shinydashboard::box(
            title = tagList(
              icon(
                "filter",
                lib = "font-awesome"
              ),
              translate()$t(
                "Filter Images"
              )
            ),
            status = "primary",
            width = 12,
            collapsible = TRUE,
            collapsed = FALSE,

            tags$div(
              a(
                translate()$t(
                  "Click for Help"
                ),
                target = "_blank",
                href = "img_clssfctn_ud_filter_images_help.html",
                style = "float: left;"
              )
            ),

            br(),

            fluidRow(
              column(
                12,
                popify(
                  selectInput(
                    "img_clssfctn_ud_src_inpt",
                    translate()$t(
                      "Database Source"
                    ),
                    width = "100%",
                    choices = c(
                      translate()$t(
                        "From computer"
                      ),
                      translate()$t(
                        "From server"
                      )
                    ),
                    multiple = FALSE
                  ),
                  title = translate()$t(
                    "Database Source"
                  ),
                  content = translate()$t(
                    paste0(
                      "Select where your database is located. Your database ",
                      "can either be loaded from an Rdata file hosted locally ",
                      "on your computer, or it can be loaded from Panthera's ",
                      "servers."
                    )
                  ),
                  placement = "top",
                  trigger = "focus",
                  options = list(
                    container = "body"
                  )
                )

              ) # column

            ), # fluidRow

            fluidRow(
              column(
                12,
                uiOutput(
                  "img_clssfctn_ud_dt_src"
                )
              )
            )

          ) # box
        )

      )
    })
################################################################################
    output$img_clssfctn_ud_body_vw_img <- renderUI({

      tags$div(


        shinydashboard::box(
          title = tagList(
            icon(
              "eye",
              lib = "font-awesome"
            ),
            translate()$t(
              "View Images"
            )
          ),
          status = "primary",
          width = 12,
          collapsible = TRUE,
          collapsed = FALSE,

          column(
            12,

            fluidRow(

              column(
                7,
                tags$div(
                  title = translate()$t(
                    "Image details:"
                  ),
                  textOutput(
                    "clssfctn_ud_img_name"
                  ),
                  textOutput(
                    "clssfctn_ud_nmbr_of_indvdls"
                  ),
                  style = "padding-left: 15px"
                ),
                style = "margin-top: 8px;"
              ), # column

              column(
                2,
                tags$div(
                  actionButton(
                    "img_clssfctn_ud_prvs_bttn",
                    translate()$t(
                      "Previous Batch"
                    ),
                    icon = icon(
                      "backward"
                    ),
                    class = "btn btn-primary btn-block"
                  )
                ),
                style = "margin-top: 10px;"
              ), # column

              column(
                1,
                tags$div(
                  title = translate()$t(
                    "Counter number"
                  ),
                  textOutput(
                    "clssfctn_ud_cntr"
                  )
                ),
                style = "margin-top: 15px;"
              ),

              column(
                2,
                tags$div(
                  actionButton(
                    "img_clssfctn_ud_nxt_bttn",
                    translate()$t(
                      "Next Batch"
                    ),
                    icon = icon(
                      "forward"
                    ),
                    class = "btn btn-primary btn-block"
                  )
                ),
                style = "margin-top: 10px;"
              ) # column

            ), # fluidRow

            hr(),
            column(
              12,
              div(
                class = "container",
                tags$br(),
                tags$div(
                  #class = "row wrapper",
                  tags$div(
                    id = "galley",
                    onmousedown = "isKeyPressed(event)",
                    tags$ul(id = "x",
                            class = "pictures")
                  ) # div
                ),
                tags$br(),
                PantheraIDSImageViewer::imageViewer('img_clssfctn_ud.csv',
                                                    width = "0px",
                                                    height = "0px"
                ) # PantheraIDSImageViewer
              ) # div
            ),


            #style = "align-content: center;"), # column img_clssfctn_ud.csv

            # slickROutput(
            #   "img_clssfctn_ud_id",
            #   height = "530px"
            # ), #%>%
            # # withSpinner(color="#0dc5c1"),
            # tags$br(),
            #
            # slickROutput(
            #   "img_clssfctn_ud_pre",
            #   height = "150px"
            # ),

            column(
              12,
              div(
                class = "container",
                tags$br(),
                tags$div(
                  #class = "row wrapper",
                  tags$div(
                    id = "galley",
                    onmousedown = "isKeyPressed(event)",
                    tags$ul(
                      id = "x",
                      class = "pictures"
                    )
                  )
                ),
                tags$br(),
                PantheraIDSImageViewer::imageViewer(
                   'img_clssfctn_ud.csv',# The csv needs to be in the www folder
                  width = "0px",
                  height = "0px"
                ) # imageViewer
              ),
              style = "align-content: center;"
            ), # column

            height = "730px"
          ) # column
        ) # box
      )
    })
################################################################################
    output$img_clssfctn_ud_body_edt_img <- renderUI({
      tags$div(

        shinydashboard::box(
          title = tagList(
            icon(
              "pencil-square-o",
              lib = "font-awesome"
            ),
            translate()$t(
              "Edit"
            )
          ),
          status = "primary",
          width = 12,
          collapsible = TRUE,
          collapsed = FALSE,

          tags$div(
            a(
              translate()$t(
                "Click for Help"
              ),
              target = "_blank",
              href = "img_clssfctn_ud_edit_help.html",
              style = "float: left;"
            )
          ),
          br(),

          bottom_padding,

          fluidRow(
            column(
              12,
              uiOutput(
                "img_clssfctn_ud_dt_edt"
              )
            )
          )

        ) # box
      )
    })
################################################################################
################################################################################
################################################################################
################################################################################
################################################################################
################################################################################
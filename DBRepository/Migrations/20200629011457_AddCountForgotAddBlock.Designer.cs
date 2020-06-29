﻿// <auto-generated />
using DBRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Models;
using System;

namespace DBRepository.Migrations
{
    [DbContext(typeof(RepositoryContext))]
    [Migration("20200629011457_AddCountForgotAddBlock")]
    partial class AddCountForgotAddBlock
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Balance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("BitcoinBalance");

                    b.Property<double>("DefimaBalance");

                    b.Property<double>("RateBTC_USD");

                    b.Property<double>("RateUSD_DEF");

                    b.Property<double>("USDBalance");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Balance");
                });

            modelBuilder.Entity("Models.ConfirmEmail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("TimeConfirm");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ConfirmEmail");
                });

            modelBuilder.Entity("Models.CurrentSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("IP");

                    b.Property<DateTime>("LoginTime");

                    b.Property<string>("Token")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CurrentSession");
                });

            modelBuilder.Entity("Models.EmailAddres", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Email");
                });

            modelBuilder.Entity("Models.ForgotPassword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CountAttempt");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<DateTime>("TimeForgot");

                    b.Property<int>("UserId");

                    b.Property<string>("Username")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ForgotPassword");
                });

            modelBuilder.Entity("Models.Investment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AddCash");

                    b.Property<DateTime>("DateInvestment");

                    b.Property<bool>("IsFullInvest");

                    b.Property<double>("LastCommission");

                    b.Property<double>("Profit");

                    b.Property<double>("TotalCommission");

                    b.Property<int>("TypeInvestmentId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("TypeInvestmentId");

                    b.HasIndex("UserId");

                    b.ToTable("Investment");
                });

            modelBuilder.Entity("Models.LoginHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Country");

                    b.Property<string>("IP")
                        .IsRequired();

                    b.Property<DateTime>("LoginTime");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("LoginHistory");
                });

            modelBuilder.Entity("Models.News", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Header")
                        .IsRequired();

                    b.Property<DateTime>("LastChangeDate");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("Models.TypeInvestment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Persent");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("TypeInvestment");
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adress");

                    b.Property<DateTime>("BDay");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsBlock");

                    b.Property<bool>("IsFogotPassword");

                    b.Property<bool>("IsReInvest");

                    b.Property<bool>("IsVerified");

                    b.Property<string>("LastName");

                    b.Property<int?>("ParentId");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Phone");

                    b.Property<string>("RefLink");

                    b.Property<int?>("UserId");

                    b.Property<string>("Username")
                        .IsRequired();

                    b.Property<int>("Zip");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserInfo");
                });

            modelBuilder.Entity("Models.Balance", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("Balance")
                        .HasForeignKey("Models.Balance", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.ConfirmEmail", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("ConfirmEmail")
                        .HasForeignKey("Models.ConfirmEmail", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.CurrentSession", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("CurrentSessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.ForgotPassword", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithOne("ForgotPassword")
                        .HasForeignKey("Models.ForgotPassword", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.Investment", b =>
                {
                    b.HasOne("Models.TypeInvestment", "TypeInvestment")
                        .WithMany("Investments")
                        .HasForeignKey("TypeInvestmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Models.User", "User")
                        .WithMany("Investments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.LoginHistory", b =>
                {
                    b.HasOne("Models.User", "User")
                        .WithMany("LoginHistories")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Models.User", b =>
                {
                    b.HasOne("Models.User")
                        .WithMany("Children")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
